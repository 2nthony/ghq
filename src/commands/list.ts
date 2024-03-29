import path from 'node:path'
import type { PathLike } from 'node:fs'
import type { PluginApi } from '../types'
import { analyzeUrl } from '../url'
import { collectDirs } from '../fs'
import { resolveConfig } from '../config'

export const listCommand: PluginApi = {
  extend(api) {
    api.cli
      .command('list [query]', 'List local repositories')
      .alias('ls')
      .option('-p, --full-path', 'Print full path', {
        default: false,
      })
      .action(async (query, { fullPath }) => {
        const { root } = await resolveConfig()

        /**
         * deep `4` means:
         * 1 ~/ghq
         * 2 github.com
         * 3 user
         * 4 repo
         */
        let entries = await collectDirs(root, 4)

        if (query) {
          entries = entries.filter((entry) => {
            const repoPath = relativeRootPath(entry)
            const repo = analyzeUrl(repoPath)

            return (
              repo.user.includes(query) || repo.name.includes(query)
            )
          })
        }

        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index]
          print(entry)
        }

        function relativeRootPath(entryPath: PathLike) {
          return path.relative(root, entryPath.toString())
        }

        function print(entry: PathLike) {
          if (fullPath)
            console.info(entry)
          else
            console.info(relativeRootPath(entry))
        }
      })
  },
}
