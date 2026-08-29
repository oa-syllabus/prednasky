#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import fse from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { slideDistDir } from './utils/coursePaths.js'
import { artifactName } from './utils/assembleDist.js'

const [, , matrixJsonArg, artifactsDirArg] = process.argv
if (!matrixJsonArg || !artifactsDirArg) {
    console.error('Usage: node scripts/assemble-dist.js <matrixJson> <artifactsDir>')
    process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const rootDir    = path.resolve(__dirname, '..')

const matrix = JSON.parse(matrixJsonArg)

for (const { course, name } of matrix) {
    const src  = path.join(artifactsDirArg, artifactName(course, name))
    const dest = slideDistDir(rootDir, course, name)

    if (!await fse.pathExists(src)) {
        const actual = fs.existsSync(artifactsDirArg) ? fs.readdirSync(artifactsDirArg) : []
        throw new Error(
            `Chybí artifact pro ${course}/${name}: očekávaný adresář "${src}" neexistuje. ` +
            `Obsah "${artifactsDirArg}": ${actual.length ? actual.join(', ') : '(prázdný nebo neexistuje)'}`,
        )
    }

    await fse.ensureDir(dest)
    await fse.copy(src, dest, { overwrite: true })
    console.log(`✅ assembled ${course}/${name}`)
}
