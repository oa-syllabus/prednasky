import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { mergeComponentsForSlide } from './components.js'

async function makeFile(dir, name, content) {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, name), content)
}

test('mergeComponentsForSlide copies course-specific and shared components', async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'merge-components-'))
    const rootComponentsDir = path.join(tmp, 'root-components')
    const courseComponentsDir = path.join(tmp, 'course-components')
    const slideDir = path.join(tmp, 'slide')
    await fs.mkdir(slideDir, { recursive: true })
    await makeFile(rootComponentsDir, 'Counter.vue', 'ROOT_COUNTER')
    await makeFile(courseComponentsDir, 'Marker.vue', 'COURSE_MARKER')

    const dest = await mergeComponentsForSlide({ slideDir, rootComponentsDir, courseComponentsDir })

    assert.equal(await fs.readFile(path.join(dest, 'Counter.vue'), 'utf8'), 'ROOT_COUNTER')
    assert.equal(await fs.readFile(path.join(dest, 'Marker.vue'), 'utf8'), 'COURSE_MARKER')
})

test('mergeComponentsForSlide lets root component win over a same-named course component', async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'merge-components-'))
    const rootComponentsDir = path.join(tmp, 'root-components')
    const courseComponentsDir = path.join(tmp, 'course-components')
    const slideDir = path.join(tmp, 'slide')
    await fs.mkdir(slideDir, { recursive: true })
    await makeFile(rootComponentsDir, 'Counter.vue', 'ROOT_VERSION')
    await makeFile(courseComponentsDir, 'Counter.vue', 'COURSE_VERSION')

    const dest = await mergeComponentsForSlide({ slideDir, rootComponentsDir, courseComponentsDir })

    assert.equal(await fs.readFile(path.join(dest, 'Counter.vue'), 'utf8'), 'ROOT_VERSION')
})

test('mergeComponentsForSlide works when the course has no component override', async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'merge-components-'))
    const rootComponentsDir = path.join(tmp, 'root-components')
    const courseComponentsDir = path.join(tmp, 'course-components') // neexistuje
    const slideDir = path.join(tmp, 'slide')
    await fs.mkdir(slideDir, { recursive: true })
    await makeFile(rootComponentsDir, 'Counter.vue', 'ROOT_VERSION')

    const dest = await mergeComponentsForSlide({ slideDir, rootComponentsDir, courseComponentsDir })

    assert.equal(await fs.readFile(path.join(dest, 'Counter.vue'), 'utf8'), 'ROOT_VERSION')
})
