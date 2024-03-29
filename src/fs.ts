import type { PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import { join } from './path'
import type { Config } from './types'

export async function makeDir(dirPath: PathLike) {
  return await fs.mkdir(dirPath, { recursive: true })
}

export async function exists(targetPath: PathLike) {
  try {
    await fs.access(targetPath)
    return true
  }
  catch {
    return false
  }
}

export async function read(filePath: PathLike) {
  try {
    return await fs.readFile(filePath, 'utf8')
  }
  catch {
    return ''
  }
}

export async function writeJson(filePath: string, config: Config) {
  return await fs.writeFile(filePath, JSON.stringify(config, null, 2))
}

/**
 * `dirPath` itself equal to deep 1
 */
export async function collectDirs(dirPath: PathLike, deep = 1) {
  let currentDeep = 0

  const resCollect: PathLike[] = []

  await read(dirPath)

  async function read(currentDirPath: typeof dirPath) {
    if (!(await exists(currentDirPath)))
      return

    currentDeep += 1

    if (currentDeep === deep) {
      resCollect.push(currentDirPath)
      return
    }

    const dirDirents = (
      await fs.readdir(currentDirPath, { withFileTypes: true })
    ).filter(dirent => dirent.isDirectory())

    for (let index = 0; index < dirDirents.length; index++) {
      const dirent = dirDirents[index]

      await read(join(currentDirPath.toString(), dirent.name))

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
