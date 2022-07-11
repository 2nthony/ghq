import { PathLike } from 'fs'
import fs from 'fs/promises'
import path from 'path'

export async function makeDir(dirPath: PathLike) {
  return await fs.mkdir(dirPath, { recursive: true })
}

export async function existsDir(dirPath: PathLike) {
  return await fs
    .access(dirPath)
    .then(() => true)
    .catch(() => false)
}

/**
 * `dirPath` itself equal to deep 1
 */
export async function collectDirs(dirPath: PathLike, deep = 1) {
  let currentDeep = 0

  const resCollect: PathLike[] = []

  await read(dirPath)

  async function read(currentDirPath: typeof dirPath) {
    currentDeep += 1

    if (currentDeep === deep) {
      resCollect.push(currentDirPath)
      return
    }

    const dirDirents = (
      await fs.readdir(currentDirPath, { withFileTypes: true })
    ).filter((dirent) => dirent.isDirectory())

    for (let index = 0; index < dirDirents.length; index++) {
      const dirent = dirDirents[index]

      await read(path.join(currentDirPath.toString(), dirent.name))

      /**
       * if this dirent is the last directory
       * then END THIS loop, mark `currentDeep` to
       * previous deep
       */
      if (dirDirents.length >= index + 1) {
        currentDeep -= 1

        continue
      }
    }
  }

  return resCollect
}
