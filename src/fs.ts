import { PathLike } from 'fs'
import fs from 'fs/promises'

export async function makeDir(dirPath: PathLike) {
  return await fs.mkdir(dirPath, { recursive: true })
}

export async function existsDir(dirPath: PathLike) {
  return await fs
    .access(dirPath)
    .then(() => true)
    .catch(() => false)
}
