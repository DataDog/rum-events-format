const fs = require('fs')
const path = require('path')
const { compileFromFile } = require('json-schema-to-typescript')
const prettier = require('prettier')
const { printLog, logAndExit } = require('./utils')

const schemasDirectoryPath = path.join(__dirname, '..', 'schemas')
const prettierConfigPath = path.join(__dirname, '..', '.prettierrc.yml')

const definitions = [
  { source: 'rum-events-schema.json', name: 'rum' },
  { source: 'telemetry-events-schema.json', name: 'telemetry' },
  { source: 'session-replay-browser-schema.json', name: 'browserSessionReplay' },
  { source: 'session-replay-mobile-schema.json', name: 'mobileSessionReplay' },
  { source: 'session-replay-schema.json', name: 'sessionReplay' },
]

async function main() {
  const distDir = path.join(__dirname, '..', 'dist')

  fs.rmSync(distDir, { recursive: true, force: true })
  fs.mkdirSync(distDir)

  definitions.forEach(async (definition) => {
    const { source, name } = definition
    await generateTypesFromSchema(path.join(distDir, `${name}.d.ts`), source)
  })
}

async function generateTypesFromSchema(typesPath, schema, { options = {} } = {}) {
  const schemaPath = path.join(schemasDirectoryPath, schema)
  const prettierConfig = await prettier.resolveConfig(prettierConfigPath)
  printLog(`Compiling ${schemaPath}...`)
  const compiledTypes = await compileFromFile(schemaPath, {
    cwd: schemasDirectoryPath,
    bannerComment: '/* eslint-disable */\n/**\n * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.\n*/',
    style: prettierConfig,
    ...options,
  })
  printLog(`Writing ${typesPath}...`)
  fs.writeFileSync(typesPath, compiledTypes)
  printLog('Generation done.')
}

main().catch(logAndExit)
