import type { PluginApi } from '../types'
import { parseCliOptionsToGitArgs } from '../args'
import { readConfig } from '../config'
import { clone } from '../git'
import { analyzeUrl } from '../url'

export const cloneCommand: PluginApi = {
  extend(api) {
    api.cli
      .command('clone [repo]', 'Clone/sync with a remote repository')
      .alias('get')
      .option('--shallow', 'Shallow clone, alias to `--depth 1`', {
        default: false,
        type: [Boolean],
      })
      .ignoreOptionDefaultValue()
      .example('ghq clone ghq (requires `.gitconfig` has `github.user` or `user.name`)')
      .example('ghq clone 2nthony/ghq')
      .example('ghq clone github.com/2nthony/ghq')
      .example('ghq clone https://github.com/2nthony/ghq')
      .example('ghq get 2nthony/ghq')
      .allowUnknownOptions()
      .action(async (repo: string, options) => {
        if (!repo) {
          api.cli.outputHelp()
          return
        }

        // ghq clone [repo]
        // means clone my repos?
        if (!repo.includes('/')) {
          const { user } = analyzeUrl(repo)
          if (!user) {
            api.cli.outputHelp()
            return
          }
        }

        const config = await readConfig()
        const args = parseCliOptionsToGitArgs({ ...config, ...options })

        clone(repo, ...args)
      })
  },
}
