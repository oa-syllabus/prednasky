import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { listSlidesByCourse, SKIP_TALKS } from './listSlides.js'

async function makeSlide(slidesDir, folder, pkg) {
    const dir = path.join(slidesDir, folder)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg))
}

async function makeCourseRoot(courseIds) {
    const rootDir = await fs.mkdtemp(path.join(os.tmpdir(), 'list-slides-'))
    for (const id of courseIds) {
        await fs.mkdir(path.join(rootDir, 'courses', id, 'slides'), { recursive: true })
    }
    return rootDir
}

test('listSlidesByCourse filters out skipTalks entries but keeps totalCount unfiltered', async () => {
    const rootDir = await makeCourseRoot(['pva2'])
    const slidesDir = path.join(rootDir, 'courses', 'pva2', 'slides')
    await makeSlide(slidesDir, '00_skeleton', { name: '00_skeleton' })
    await makeSlide(slidesDir, '01_uvod', { name: '01_uvod' })

    const config = { courses: [{ id: 'pva2', title: 'PVA2' }] }
    const [result] = await listSlidesByCourse({ config, rootDir, skipTalks: ['00_skeleton'] })

    assert.equal(result.totalCount, 2)
    assert.deepEqual(result.entries.map(e => e.name), ['01_uvod'])
})

test('listSlidesByCourse defaults skipTalks to the shared SKIP_TALKS constant', async () => {
    const rootDir = await makeCourseRoot(['pva2'])
    const slidesDir = path.join(rootDir, 'courses', 'pva2', 'slides')
    await makeSlide(slidesDir, SKIP_TALKS[0], { name: SKIP_TALKS[0] })
    await makeSlide(slidesDir, '01_uvod', { name: '01_uvod' })

    const config = { courses: [{ id: 'pva2', title: 'PVA2' }] }
    const [result] = await listSlidesByCourse({ config, rootDir })

    assert.deepEqual(result.entries.map(e => e.name), ['01_uvod'])
})

test('listSlidesByCourse returns one entry per configured course, in config order', async () => {
    const rootDir = await makeCourseRoot(['pva2', 'scm'])
    await makeSlide(path.join(rootDir, 'courses', 'pva2', 'slides'), '01_a', { name: '01_a' })
    await makeSlide(path.join(rootDir, 'courses', 'scm', 'slides'), '01_b', { name: '01_b' })

    const config = { courses: [{ id: 'pva2', title: 'PVA2' }, { id: 'scm', title: 'SCM' }] }
    const results = await listSlidesByCourse({ config, rootDir })

    assert.deepEqual(results.map(r => r.course.id), ['pva2', 'scm'])
    assert.deepEqual(results.map(r => r.entries.map(e => e.name)), [['01_a'], ['01_b']])
})

test('listSlidesByCourse totalCount stays 0 for a genuinely empty course (no skipTalks involved)', async () => {
    const rootDir = await makeCourseRoot(['pva2'])
    const config = { courses: [{ id: 'pva2', title: 'PVA2' }] }
    const [result] = await listSlidesByCourse({ config, rootDir })

    assert.equal(result.totalCount, 0)
    assert.deepEqual(result.entries, [])
})
