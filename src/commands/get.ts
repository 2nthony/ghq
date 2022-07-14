import { clone } from '../git'
import { parseCliOptionsToGitArgs } from '../args'
import { PluginApi } from '../types'
import { readConfig } from '../config'

export const get: PluginApi = {
  extend(api) {
    api.cli
      .command('get [repo]', 'Clone/sync with a remote repository')
      .alias('clone')
      .option('--shallow', 'Shallow clone, alias to `--depth 1`', {
        default: false,
        type: [Boolean],
      })
      .example('ghq get 2nthony/ghq')
      .example('ghq get github.com/2nthony/ghq')
      .example('ghq get https://github.com/2nthony/ghq')
      .example('ghq clone 2nthony/ghq')
      .allowUnknownOptions()
      .action(async (repo, options) => {
        if (!repo) {
          api.cli.outputHelp()
          return
        }

        const config = await readConfig()
        const args = parseCliOptionsToGitArgs({ ...config, ...options })

        clone(repo, ...args)
      })
  },
}
