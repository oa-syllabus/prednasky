import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { loadCoursesConfig } from './courses.js'

test('loadCoursesConfig parses a valid config file', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'courses-config-'))
  const configPath = path.join(tmpDir, 'courses.config.json')
  await fs.writeFile(configPath, JSON.stringify({
    repoName: 'prednasky',
    ghPagesUrl: 'https://oa-syllabus.github.io/',
    courses: [{ id: 'pva2', title: 'PVA2 | Programování a vývoj aplikací' }],
  }))

  const config = await loadCoursesConfig(configPath)

  assert.equal(config.repoName, 'prednasky')
  assert.equal(config.courses.length, 1)
  assert.equal(config.courses[0].id, 'pva2')
})

test('loadCoursesConfig throws when courses array is empty', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'courses-config-'))
  const configPath = path.join(tmpDir, 'courses.config.json')
  await fs.writeFile(configPath, JSON.stringify({ repoName: 'prednasky', ghPagesUrl: 'x', courses: [] }))

  await assert.rejects(() => loadCoursesConfig(configPath), /neobsahuje žádné kurzy/)
})
