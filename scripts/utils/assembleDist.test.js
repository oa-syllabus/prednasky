// scripts/utils/assembleDist.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { artifactName } from './assembleDist.js'

test('artifactName joins course and slide name with the dist- prefix', () => {
    assert.equal(artifactName('pva2', '01_uvod_do_python'), 'dist-pva2-01_uvod_do_python')
})

test('artifactName keeps underscores in the slide name intact', () => {
    assert.equal(artifactName('scm', '10_markdown'), 'dist-scm-10_markdown')
})
