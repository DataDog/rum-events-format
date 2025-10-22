import path from 'path'
import Ajv from 'ajv'
import { readdirSync, readFileSync } from 'fs'

const SAMPLES_DIRECTORY = './samples'
const SCHEMAS_DIRECTORY = './schemas'

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
    [`${SCHEMAS_DIRECTORY}/session-replay/common/focus-record-schema.json`, ['has_focus']],
    [`${SCHEMAS_DIRECTORY}/rum/resource-schema.json`, ['operationType', 'operationName']],
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
  const ajv = new Ajv()
  forEachFile(SCHEMAS_DIRECTORY, (schemaPath) => ajv.addSchema(readJson(schemaPath)))
  forEachFile(SAMPLES_DIRECTORY, (samplePath) => {
    const schemaId = computeSchemaIdFromSamplePath(samplePath)
    const valid = ajv.validate(schemaId, readJson(samplePath))
    if (valid) {
      console.log(`✅ ${samplePath}`)
    } else {
      console.log(`❌ ${samplePath} is not valid against ${schemaId}:`)
      console.log(`   - ${ajv.errorsText(undefined, { separator: '\n   - ' })}`)
      process.exitCode = 1
    }
  })
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
      forEachObjectProperty(value, callback)
    }
  } else if (typeof schema === 'object' && schema !== null) {
    // traverse objects
    for (const value of Object.values(schema)) {
      forEachObjectProperty(value, callback)
    }

    if (schema.type === 'object') {
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
