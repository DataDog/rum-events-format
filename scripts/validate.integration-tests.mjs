// Simple integration tests for the `validate.mjs` script.
// Run it directly with `node validate.integration-tests.mjs`.
// This script is simple enough so it does not use any external dependency for now.

import { spawnSync } from 'child_process'
import { writeFileSync, mkdtempSync, mkdirSync, rmSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import assert from 'assert'
import { beforeEach, afterEach, after, describe, it } from 'node:test'

const tmpDir = mkdtempSync('rum-events-format.integration-test-')
const samplesDir = `${tmpDir}/samples`
const schemasDir = `${tmpDir}/schemas`

after(() => {
  rmSync(tmpDir, { recursive: true })
})

beforeEach(() => {
  mkdirSync(schemasDir)
  mkdirSync(samplesDir)
})

afterEach(() => {
  rmSync(schemasDir, { recursive: true })
  rmSync(samplesDir, { recursive: true })
})

describe('validate samples', () => {
  beforeEach(() => {
    writeJson(`${schemasDir}/foo-schema.json`, {
      $id: 'foo-schema.json',
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
      },
    })
    mkdirSync(`${samplesDir}/foo`)
  })

  it('successfully validates a correct sample', () => {
    writeJson(`${samplesDir}/foo/bar.json`, { foo: 'bar' })

    const result = runValidate()
    assert.strictEqual(result.status, 0)
    assert.match(result.stdout, /✅ \.\/samples\/foo\/bar\.json/)
  })

  it('fails to validate an incorrect sample', () => {
    writeJson(`${samplesDir}/foo/bar.json`, { foo: 1 })

    const result = runValidate()
    assert.strictEqual(result.status, 1)
    assert.match(result.stdout, /❌ \.\/samples\/foo\/bar\.json is not valid against foo-schema\.json/)
    assert.match(result.stdout, /data\/foo must be string/)
  })
})

describe('validate schemas ids', () => {
  it('successfully validates a correct schema', () => {
    writeJson(`${schemasDir}/foo-schema.json`, {
      $id: 'foo-schema.json',
      type: 'object',
    })
    const result = runValidate()
    assert.strictEqual(result.status, 0)
  })

  it('fails to validate an incorrect schema', () => {
    writeJson(`${schemasDir}/foo-schema.json`, {
      $id: 'bar-schema.json',
      type: 'object',
    })

    const result = runValidate()
    assert.strictEqual(result.status, 1)
    assert.match(result.stdout, /❌ Schema \.\/schemas\/foo-schema\.json \$id should be foo-schema\.json/)
  })
})

describe('validate schemas objects properties case', () => {
  it('validates case for RUM and telemetry schemas', () => {
    mkdirSync(`${schemasDir}/rum`)
    writeJson(`${schemasDir}/rum/foo-schema.json`, {
      $id: 'rum/foo-schema.json',
      type: 'object',
      properties: {
        foo_bar: {
          type: 'string',
        },
      },
    })
    const result = runValidate()
    assert.strictEqual(result.status, 0)
  })

  it('validates case for other schemas', () => {
    writeJson(`${schemasDir}/foo-schema.json`, {
      $id: 'foo-schema.json',
      type: 'object',
      properties: {
        fooBar: {
          type: 'string',
        },
      },
    })
    const result = runValidate()
    assert.strictEqual(result.status, 0)
  })

  it('fails to validate an incorrect schema', () => {
    writeJson(`${schemasDir}/foo-schema.json`, {
      $id: 'foo-schema.json',
      type: 'object',
      properties: {
        foo_bar: {
          type: 'string',
        },
      },
    })

    const result = runValidate()
    assert.strictEqual(result.status, 1)
    assert.match(result.stdout, /❌ Schema \.\/schemas\/foo-schema\.json property foo_bar is not camelCase/)
    assert.match(
      result.stdout,
      /RUM and telemetry schemas object properties should be snake_case, other schemas objects should be camelCase/
    )
  })
})

function runValidate() {
  const validatePath = `${dirname(fileURLToPath(import.meta.url))}/validate.mjs`
  return spawnSync('node', [validatePath], { cwd: tmpDir, encoding: 'utf8' })
}

function writeJson(filePath, object) {
  writeFileSync(filePath, JSON.stringify(object))
}
