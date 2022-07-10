import { PluginApi } from '../types'
import fg from 'fast-glob'
import path from 'path'
import { rootPath } from '../shared'
import { analyzeUrl } from '../shared/url'
import { Entry } from 'fast-glob/out/types'

export const list: PluginApi = {
  extend(api) {
    api.cli
      .command('list [query]', 'List local repositories')
      .option('-p, --full-path', 'Print full path', {
        default: false,
      })
      .action(async (query, { fullPath }) => {
        let entries = await fg(path.join(rootPath, '*', '*', '*'), {
          onlyDirectories: true,
          objectMode: true,
          dot: true,
        })

        if (query) {
          entries = entries.filter((entry) => {
            // github.com/uer/name
            const repoPath = relativeRootPath(entry.path)
            const repo = analyzeUrl(repoPath)

            return (
              repo.user.indexOf(query) !== -1 || repo.name.indexOf(query) !== -1
            )
          })
        }

        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index]
          print(entry)
        }

        function relativeRootPath(entryPath: Entry['path']) {
          return path.relative(rootPath, entryPath)
        }

        function print(entry: Entry) {
          if (fullPath) {
            console.info(entry.path)
          } else {
            console.info(relativeRootPath(entry.path))
          }
        }
      })
  },
}
