import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderCourseIndexHtml, renderHubIndexHtml, renderReadmeSection } from './render.js'
import { computeLiveUrl } from './paths.js'

test('renderCourseIndexHtml lists every entry with a link and PDF link', () => {
    const html = renderCourseIndexHtml({
        title: 'PVA2 | Programování a vývoj aplikací',
        entries: [{ name: '01_uvod_do_python', title: 'Úvod do Pythonu' }],
        year: 2026,
    })

    assert.match(html, /PVA2 \| Programování a vývoj aplikací/)
    assert.match(html, /href="\.\/01_uvod_do_python"/)
    assert.match(html, /href="\.\/01_uvod_do_python\/01_uvod_do_python\.pdf"/)
})

test('renderHubIndexHtml lists every course with a link and entry count', () => {
    const html = renderHubIndexHtml({
        courses: [{ id: 'scm', title: 'SCM | Programování a vývoj aplikací', entryCount: 6 }],
        year: 2026,
    })

    assert.match(html, /href="\.\/scm\/"/)
    assert.match(html, /6 přednášek/)
})

test('renderReadmeSection renders a markdown table with live and PDF links', () => {
    const md = renderReadmeSection({
        course: { id: 'scm', title: 'SCM' },
        entries: [{ name: '10_markdown', title: 'Markdown' }],
        ghPagesUrl: 'https://oa-syllabus.github.io/',
        repoName: 'prednasky',
        computeLiveUrl,
    })

    assert.match(md, /## SCM/)
    assert.match(md, /\[Markdown\]\(https:\/\/oa-syllabus\.github\.io\/prednasky\/scm\/10_markdown\/\)/)
})
