import path from 'path'
import Ajv from 'ajv'
import { readdirSync, readFileSync } from 'fs'

const SAMPLES_DIRECTORY = './samples'
const SCHEMAS_DIRECTORY = './schemas'
const FEATURE_FLAGS_SAMPLE_PREFIX = `${SAMPLES_DIRECTORY}/telemetry-events/feature-flags-`
const FEATURE_FLAGS_COMMON_FIELDS = [
  'type',
  'status',
  'message',
  'product',
  'event_type',
  'timestamp',
  'runtime_id',
  'sequence',
  'application_id',
  'application_service',
  'environment_name',
  'sdk_name',
  'sdk_version',
  'evaluation_reporting_enabled',
]
const FEATURE_FLAGS_EVENT_CONTRACTS = {
  sdk_init_started: { status: 'debug', fields: [] },
  configuration_received: {
    status: 'debug',
    fields: ['configuration_source', 'configuration_version', 'configuration_fetched_at'],
    required: ['configuration_source'],
  },
  provider_ready: {
    status: 'debug',
    fields: ['provider_status', 'init_latency_ms'],
    required: ['provider_status', 'init_latency_ms'],
  },
  provider_error: { status: 'error', fields: ['error_code'], required: ['error_code'] },
  first_evaluation: { status: 'debug', fields: [] },
  init_timeout: {
    status: 'error',
    fields: ['provider_status', 'error_code', 'init_latency_ms'],
    required: ['provider_status', 'error_code', 'init_latency_ms'],
  },
  init_failed: {
    status: 'error',
    fields: ['provider_status', 'error_code', 'init_latency_ms'],
    required: ['provider_status', 'error_code', 'init_latency_ms'],
  },
}

validateSchemasObjectsPropertiesCase()
validateSchemasIds()
validateSamples()
validateRequiredProperties()

if (process.exitCode !== 0 && process.exitCode !== undefined) {
  console.log('❌ Some validation errors were found')
}

function validateSchemasObjectsPropertiesCase() {
  // Some properties don't follow the convention. Ideally they should be fixed in the future.
  const CASING_EXCEPTIONS = new Map([
    [
      `${SCHEMAS_DIRECTORY}/session-replay/common/_common-segment-metadata-schema.json`,
      ['records_count', 'index_in_view', 'has_full_snapshot'],
    ],
    [`${SCHEMAS_DIRECTORY}/session-replay/browser/segment-metadata-schema.json`, ['creation_reason']],
    [`${SCHEMAS_DIRECTORY}/session-replay/common/focus-record-schema.json`, ['has_focus']],
    [`${SCHEMAS_DIRECTORY}/rum/_graphql-schema.json`, ['operationType', 'operationName']],
    [`${SCHEMAS_DIRECTORY}/profiling/_common-schema.json`, ['long_task', 'tags_profiler']],
    [`${SCHEMAS_DIRECTORY}/profiling/browser/profile-event-schema.json`, ['_dd', 'clock_drift']],
    [`${SCHEMAS_DIRECTORY}/profiling/mobile/profile-rum-metadata-event-schema.json`, ['duration_ns', 'start_ns']],
  ])

  let displayConvention = false

  forEachFile(SCHEMAS_DIRECTORY, (schemaPath) => {
    const schema = readJson(schemaPath)

    // RUM and telemetry schemas object properties should be snake_case, other schemas objects should
    // be camelCase
    const shouldBeSnakeCase =
      schemaPath.startsWith(`${SCHEMAS_DIRECTORY}/rum/`) || schemaPath.startsWith(`${SCHEMAS_DIRECTORY}/telemetry/`)

    const caseExceptions = CASING_EXCEPTIONS.get(schemaPath) || []

    forEachObjectProperty(schema, (key) => {
      const isCorrectCase = shouldBeSnakeCase ? isSnakeCase(key) : isCamelCase(key)
      if (!isCorrectCase && !caseExceptions.includes(key)) {
        console.log(`❌ Schema ${schemaPath} property ${key} is not ${shouldBeSnakeCase ? 'snake_case' : 'camelCase'}`)
        displayConvention = true
        process.exitCode = 1
      }
    })
  })

  if (displayConvention) {
    console.log(
      'ℹ️  RUM and telemetry schemas object properties should be snake_case, other schemas objects should be camelCase'
    )
  }
}

function validateRequiredProperties() {
  forEachFile(SCHEMAS_DIRECTORY, (schemaPath) => {
    forEachObject(readJson(schemaPath), (schema) => {
      if (schema.required) {
        for (const requiredPropertyName of schema.required) {
          if (!schema.properties?.[requiredPropertyName]) {
            console.log(`❌ Schema ${schemaPath} is missing required property ${requiredPropertyName}`)
            process.exitCode = 1
          }
        }
      }
    })
  })
}

function validateSchemasIds() {
  forEachFile(SCHEMAS_DIRECTORY, (schemaPath) => {
    const schema = readJson(schemaPath)

    // We need to be careful about schema ids because they need to:
    // * be unique, or else Ajv will throw
    // * represent a path, as Ajv will use it to resolve $refs
    // Here, we make sure that both requirements are respected.
    const schemaId = computeSchemaIdFromSchemaPath(schemaPath)
    if (schema.$id !== schemaId) {
      console.log(`❌ Schema ${schemaPath} $id should be ${schemaId}`)
      process.exitCode = 1
    }
  })
}

function validateSamples() {
  const ajv = new Ajv({
    strict: true,
    // By default, ajv objects to heterogeneous tuples; the reasoning is that
    // they are awkward to work with in some languages. Disable this warning
    // since we're using this feature extensively and are aware of the tradeoffs.
    strictTuples: false,
    allowUnionTypes: true,
  })
  forEachFile(SCHEMAS_DIRECTORY, (schemaPath) => ajv.addSchema(readJson(schemaPath)))
  forEachFile(SAMPLES_DIRECTORY, (samplePath) => {
    const schemaId = computeSchemaIdFromSamplePath(samplePath)
    const sample = readJson(samplePath)
    let valid
    try {
      valid = ajv.validate(schemaId, sample)
    } catch (error) {
      console.log(`❌ ${samplePath} had a validation error against ${schemaId}:`)
      console.log(`   - ${error.message}`)
      process.exitCode = 1
      return
    }

    if (valid) {
      const featureFlagsErrors = validateFeatureFlagsLifecycleSample(samplePath, sample)
      if (featureFlagsErrors.length === 0) {
        console.log(`✅ ${samplePath}`)
      } else {
        console.log(`❌ ${samplePath} has an invalid Feature Flags lifecycle payload:`)
        console.log(`   - ${featureFlagsErrors.join('\n   - ')}`)
        process.exitCode = 1
      }
    } else {
      console.log(`❌ ${samplePath} is not valid against ${schemaId}:`)
      console.log(`   - ${ajv.errorsText(undefined, { separator: '\n   - ' })}`)
      process.exitCode = 1
    }
  })
}

function validateFeatureFlagsLifecycleSample(samplePath, sample) {
  if (!samplePath.startsWith(FEATURE_FLAGS_SAMPLE_PREFIX)) {
    return []
  }

  const telemetry = sample.telemetry
  if (!isPlainObject(telemetry)) {
    return ['telemetry must be an object']
  }

  const errors = []
  const contract = FEATURE_FLAGS_EVENT_CONTRACTS[telemetry.event_type]
  if (!contract) {
    return [`event_type must be one of ${Object.keys(FEATURE_FLAGS_EVENT_CONTRACTS).join(', ')}`]
  }

  const requiredFields = [
    'type',
    'status',
    'message',
    'product',
    'event_type',
    'timestamp',
    'runtime_id',
    'sequence',
    'sdk_name',
    'sdk_version',
    ...(contract.required || []),
  ]
  for (const field of requiredFields) {
    if (!Object.hasOwn(telemetry, field)) {
      errors.push(`${field} is required`)
    }
  }

  const allowedFields = new Set([...FEATURE_FLAGS_COMMON_FIELDS, ...contract.fields])
  for (const field of Object.keys(telemetry)) {
    if (!allowedFields.has(field)) {
      errors.push(`${field} is not allowed for ${telemetry.event_type}`)
    }
  }

  expectEqual(errors, telemetry.type, 'log', 'type')
  expectEqual(errors, telemetry.product, 'feature_flags', 'product')
  expectEqual(errors, telemetry.status, contract.status, 'status')
  expectEqual(errors, telemetry.message, `feature_flags.${telemetry.event_type}`, 'message')
  expectJsonInteger(errors, telemetry.timestamp, 'timestamp', 0)
  expectJsonInteger(errors, telemetry.sequence, 'sequence', 1)
  expectUuid(errors, telemetry.runtime_id, 'runtime_id')
  expectBoundedString(errors, telemetry.sdk_name, 'sdk_name', 100)
  expectBoundedString(errors, telemetry.sdk_version, 'sdk_version', 100)
  expectOptionalUuid(errors, telemetry, 'application_id')
  expectOptionalBoundedString(errors, telemetry, 'application_service', 100)
  expectOptionalBoundedString(errors, telemetry, 'environment_name', 200)

  if (
    Object.hasOwn(telemetry, 'evaluation_reporting_enabled') &&
    typeof telemetry.evaluation_reporting_enabled !== 'boolean'
  ) {
    errors.push('evaluation_reporting_enabled must be a boolean')
  }
  if (
    Object.hasOwn(telemetry, 'configuration_source') &&
    !['remote', 'cache', 'agent'].includes(telemetry.configuration_source)
  ) {
    errors.push('configuration_source must be remote, cache, or agent')
  }
  expectOptionalBoundedString(errors, telemetry, 'configuration_version', 200)
  expectOptionalJsonInteger(errors, telemetry, 'configuration_fetched_at', 0)
  expectOptionalJsonInteger(errors, telemetry, 'init_latency_ms', 0)

  if (telemetry.event_type === 'provider_ready' && !['ready', 'stale'].includes(telemetry.provider_status)) {
    errors.push('provider_status must be ready or stale for provider_ready')
  }
  if (['init_timeout', 'init_failed'].includes(telemetry.event_type)) {
    expectEqual(errors, telemetry.provider_status, 'error', 'provider_status')
  }
  const expectedErrorCodes = {
    provider_error: 'precomputed_assignments_fetch_failed',
    init_timeout: 'initialization_timeout',
    init_failed: 'initialization_failed',
  }
  if (expectedErrorCodes[telemetry.event_type]) {
    expectEqual(errors, telemetry.error_code, expectedErrorCodes[telemetry.event_type], 'error_code')
  }

  return errors
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function expectEqual(errors, value, expected, field) {
  if (value !== expected) {
    errors.push(`${field} must be ${expected}`)
  }
}

function expectJsonInteger(errors, value, field, minimum) {
  if (!Number.isSafeInteger(value) || value < minimum) {
    errors.push(`${field} must be an interoperable JSON integer greater than or equal to ${minimum}`)
  }
}

function expectOptionalJsonInteger(errors, object, field, minimum) {
  if (Object.hasOwn(object, field)) {
    expectJsonInteger(errors, object[field], field, minimum)
  }
}

function expectUuid(errors, value, field) {
  if (typeof value !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value)) {
    errors.push(`${field} must be a lowercase UUID`)
  }
}

function expectOptionalUuid(errors, object, field) {
  if (Object.hasOwn(object, field)) {
    expectUuid(errors, object[field], field)
  }
}

function expectBoundedString(errors, value, field, maximumLength) {
  if (typeof value !== 'string' || value.length === 0 || Array.from(value).length > maximumLength) {
    errors.push(`${field} must be a non-empty string of at most ${maximumLength} Unicode code points`)
  }
}

function expectOptionalBoundedString(errors, object, field, maximumLength) {
  if (Object.hasOwn(object, field)) {
    expectBoundedString(errors, object[field], field, maximumLength)
  }
}

function computeSchemaIdFromSchemaPath(schemaPath) {
  // Strip the schema directory from the provided path:
  // "./schemas/session-replay/mobile/record-schema.json" -> "session-replay/mobile/record-schema.json"
  return schemaPath.slice(SCHEMAS_DIRECTORY.length + 1)
}

function computeSchemaIdFromSamplePath(samplePath) {
  // Keep only the directory path and strip the sample directory from the provided path:
  // "./samples/session-replay/mobile/record/full-snapshot-record.json" -> "session-replay/mobile/record-schema.json"
  return `${path.dirname(samplePath).slice(SAMPLES_DIRECTORY.length + 1)}-schema.json`
}

function forEachFile(directoryPath, callback) {
  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = `${directoryPath}/${entry.name}`
    if (entry.isFile()) {
      callback(entryPath)
    } else {
      forEachFile(entryPath, callback)
    }
  }
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

/**
 * Iterates over each properties of objects specified in the provided JSON schema.
 */
function forEachObjectProperty(schema, callback) {
  forEachObject(schema, (schema) => {
    if (schema.properties) {
      for (const [key, value] of Object.entries(schema.properties)) {
        callback(key, value)
      }
    }
  })
}

/**
 * Iterates over each objects specified in the provided JSON schema.
 */
function forEachObject(schema, callback) {
  if (Array.isArray(schema)) {
    // traverse arrays
    for (const value of schema) {
      forEachObject(value, callback)
    }
  } else if (typeof schema === 'object' && schema !== null) {
    // traverse objects
    for (const value of Object.values(schema)) {
      forEachObject(value, callback)
    }

    if (schema.type === 'object' || schema.properties) {
      callback(schema)
    }
  }
}

function isSnakeCase(str) {
  return /^[a-z0-9_]+$/.test(str)
}

function isCamelCase(str) {
  return /^[a-z0-9][A-Za-z0-9]*$/.test(str)
}
