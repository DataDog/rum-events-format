import * as fs from 'fs'
import * as path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import prettier from 'prettier'
import { printLog, logAndExit } from './utils.js'

const SCHEMAS_PATH = 'schemas'
const PRETTIER_CONFIG = '.prettierrc.yml'

const DEFINITIONS = [
  { source: 'rum-events-schema.json', name: 'rum' },
  { source: 'telemetry-events-schema.json', name: 'telemetry' },
  {
    source: 'session-replay-browser-schema.json',
    name: 'browserSessionReplay',
    options: { additionalProperties: false },
  },
  {
    source: 'session-replay-mobile-schema.json',
    name: 'mobileSessionReplay',
    options: { additionalProperties: false },
  },
  { source: 'session-replay-schema.json', name: 'sessionReplay', options: { additionalProperties: false } },
]

const GENERATED_PATH = path.join('ts', 'generated')

async function main() {
  fs.rmSync(GENERATED_PATH, { recursive: true, force: true })
  fs.mkdirSync(GENERATED_PATH)

  DEFINITIONS.forEach(async (definition) => {
    const { source, name, options } = definition
    await generateTypesFromSchema(path.join(GENERATED_PATH, `${name}.ts`), source, { options })
  })
}

async function generateTypesFromSchema(typesPath, schema, { options = {} } = {}) {
  const schemaPath = path.join(SCHEMAS_PATH, schema)
  const prettierConfig = await prettier.resolveConfig(PRETTIER_CONFIG)
  printLog(`Compiling ${schemaPath}...`)
  const compiledTypes = await compileFromFile(schemaPath, {
    cwd: SCHEMAS_PATH,
    bannerComment: '/* eslint-disable */\n/**\n * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.\n*/',
    style: prettierConfig,
    ...options,
  })
  printLog(`Writing ${typesPath}...`)
  fs.writeFileSync(typesPath, compiledTypes)
  printLog('Generation done.')
}

main().catch(logAndExit)
