import path from 'path'
import Ajv from 'ajv'
import { readdirSync, readFileSync } from 'fs'

const ajv = new Ajv()

const SAMPLES_DIRECTORY = './samples'
const SCHEMAS_DIRECTORY = './schemas'

forEachFile(SCHEMAS_DIRECTORY, addSchema)
forEachFile(SAMPLES_DIRECTORY, validateSample)

function addSchema(schemaPath) {
  const schema = readJson(schemaPath)

  // We need to be careful about schema ids because they need to:
  // * be unique, or else Ajv will throw
  // * represent a path, as Ajv will use it to resolve $refs
  // Here, we make sure that both requirements are respected.
  const schemaId = computeSchemaIdFromSchemaPath(schemaPath)
  if (schema.$id !== schemaId) {
    console.log(`⚠️ Schema ${schemaPath} $id should be ${schemaId}`)
    process.exitCode = 1
  }

  ajv.addSchema(schema)
}

function validateSample(samplePath) {
  const schemaId = computeSchemaIdFromSamplePath(samplePath)
  const valid = ajv.validate(schemaId, readJson(samplePath))
  if (valid) {
    console.log(`✅ ${samplePath}`)
  } else {
    console.log(`❌ ${samplePath} is not valid against ${schemaId}:`)
    console.log(`   - ${ajv.errorsText(undefined, { separator: '\n   - ' })}`)
    process.exitCode = 1
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
