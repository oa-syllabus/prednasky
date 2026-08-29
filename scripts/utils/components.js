import path from 'node:path'
import fse from 'fs-extra'
import { rimraf } from 'rimraf'

export async function mergeComponentsForSlide({ slideDir, rootComponentsDir, courseComponentsDir }) {
    const dest = path.join(slideDir, 'components')
    await rimraf(dest)
    await fse.ensureDir(dest)
    if (courseComponentsDir && await fse.pathExists(courseComponentsDir)) {
        await fse.copy(courseComponentsDir, dest, { overwrite: true })
    }
    if (rootComponentsDir && await fse.pathExists(rootComponentsDir)) {
        await fse.copy(rootComponentsDir, dest, { overwrite: true })
    }
    return dest
}
