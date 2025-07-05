import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import prettier from 'prettier'
import { printLog, logAndExit } from './utils.mjs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

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
  { source: 'profiler-api-schema.json', name: 'profilingApi', options: { additionalProperties: false } },
]

const GENERATED_PATH = path.normalize(pkg.config['path:generated'])

main().catch(logAndExit)

async function main() {
  fs.rmSync(GENERATED_PATH, { recursive: true, force: true })
  fs.mkdirSync(GENERATED_PATH)

  DEFINITIONS.forEach(async (definition) => {
    const { source, name, options } = definition
    await generateTypesFromSchema(path.join(GENERATED_PATH, `${name}.ts`), source, { options })
  })
}

async function generateTypesFromSchema(typesPath, schema, { options = {} } = {}) {
  const { compileFromFile } = await getJsonSchemaToTypescript()
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

async function getJsonSchemaToTypescript() {
  if (!getJsonSchemaToTypescript.cache) {
    getJsonSchemaToTypescript.cache = import('json-schema-to-typescript').catch((error) => {
      if (error.code !== 'ERR_MODULE_NOT_FOUND') {
        throw error
      }
      buildJsonSchemaToTypescript()
      return import('json-schema-to-typescript')
    })
  }
  return getJsonSchemaToTypescript.cache

  function buildJsonSchemaToTypescript() {
    printLog('json-schema-to-typescript not built. Building...')

    execSync(
      `
        set -eu
        cd ./node_modules/json-schema-to-typescript
        rm -rf dist
        # due to installation on node_modules, some of these steps can fail
        # built version still behaves correctly though
        set +e
        yarn
        yarn run clean
        yarn run build:server
        set -e
      `,
      {
        stdio: 'inherit',
      }
    )
  }
}
