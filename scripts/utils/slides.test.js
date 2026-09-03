import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { getSlidesSorted } from './slides.js'

async function makeSlide(slidesDir, folder, pkg) {
    const dir = path.join(slidesDir, folder)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg))
    return dir
}

test('getSlidesSorted sorts folder names numeric-aware (cs collation)', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-sort-'))
    await makeSlide(slidesDir, '2_foo', { name: '2_foo' })
    await makeSlide(slidesDir, '10_bar', { name: '10_bar' })
    await makeSlide(slidesDir, '1_baz', { name: '1_baz' })

    const entries = await getSlidesSorted(slidesDir)

    assert.deepEqual(entries.map(e => e.folder), ['1_baz', '2_foo', '10_bar'])
})

test('getSlidesSorted falls back to name when title is missing', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-title-'))
    await makeSlide(slidesDir, '01_deck', { name: '01_deck' })

    const entries = await getSlidesSorted(slidesDir)

    assert.equal(entries[0].title, '01_deck')
})

test('getSlidesSorted falls back to null when author is missing', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-author-'))
    await makeSlide(slidesDir, '01_deck', { name: '01_deck' })

    const entries = await getSlidesSorted(slidesDir)

    assert.equal(entries[0].author, null)
})

test('getSlidesSorted throws when two decks share the same package.json name', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-dup-name-'))
    await makeSlide(slidesDir, '01_first', { name: 'shared_name' })
    await makeSlide(slidesDir, '02_second', { name: 'shared_name' })

    await assert.rejects(() => getSlidesSorted(slidesDir), (err) => {
        assert.match(err.message, /shared_name/)
        assert.match(err.message, /01_first/)
        assert.match(err.message, /02_second/)
        return true
    })
})

test('getSlidesSorted throws when a deck package.json is missing "name"', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-missing-name-'))
    await makeSlide(slidesDir, '01_no_name', { title: 'No Name Deck' })

    await assert.rejects(() => getSlidesSorted(slidesDir), (err) => {
        assert.match(err.message, /01_no_name/)
        return true
    })
})

test('getSlidesSorted reads the section field from package.json', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-section-'))
    await makeSlide(slidesDir, '20_DB_nastaveni', { name: '20_DB_nastaveni', section: 'Databáze' })

    const entries = await getSlidesSorted(slidesDir)

    assert.equal(entries[0].section, 'Databáze')
})

test('getSlidesSorted falls back to null when section is missing', async () => {
    const slidesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slides-no-section-'))
    await makeSlide(slidesDir, '01_deck', { name: '01_deck' })

    const entries = await getSlidesSorted(slidesDir)

    assert.equal(entries[0].section, null)
})
