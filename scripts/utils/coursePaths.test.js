import { test } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { distDir, slidesDir, courseComponentsDir, courseDistDir, slideDistDir } from './coursePaths.js'

const ROOT = path.resolve('/fake/root')

test('distDir resolves dist/ under root', () => {
    assert.equal(distDir(ROOT), path.join(ROOT, 'dist'))
})

test('slidesDir resolves courses/<id>/slides under root', () => {
    assert.equal(slidesDir(ROOT, 'pva2'), path.join(ROOT, 'courses', 'pva2', 'slides'))
})

test('courseComponentsDir resolves courses/<id>/components under root', () => {
    assert.equal(courseComponentsDir(ROOT, 'pva4'), path.join(ROOT, 'courses', 'pva4', 'components'))
})

test('courseDistDir resolves dist/<id> under root', () => {
    assert.equal(courseDistDir(ROOT, 'scm'), path.join(ROOT, 'dist', 'scm'))
})

test('slideDistDir resolves dist/<id>/<name> under root', () => {
    assert.equal(slideDistDir(ROOT, 'scm', '01_uvod'), path.join(ROOT, 'dist', 'scm', '01_uvod'))
})
