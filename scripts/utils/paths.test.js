import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeViteBase, computeLiveUrl } from './paths.js'

test('computeViteBase builds an absolute base path scoped to repo and course', () => {
    assert.equal(
        computeViteBase('prednasky', 'pva2', '01_uvod_do_python'),
        '/prednasky/pva2/01_uvod_do_python/',
    )
})

test('computeLiveUrl builds the public GH Pages URL for a slide deck', () => {
    assert.equal(
        computeLiveUrl('https://oa-syllabus.github.io/', 'prednasky', 'scm', '10_markdown'),
        'https://oa-syllabus.github.io/prednasky/scm/10_markdown/',
    )
})
