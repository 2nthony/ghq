import { clone } from '../git'
import { parseOptionsToArgs } from '../shared'
import { PluginApi } from '../types'

export const get: PluginApi = {
  extend(api) {
    api.cli
      .command('get [repo]', 'Clone/sync with a remote repository')
      .alias('clone')
      .example('ghq get 2nthony/ghq')
      .example('ghq get github.com/2nthony/ghq')
      .example('ghq get https://github.com/2nthony/ghq')
      .allowUnknownOptions()
      .action((repo, options) => {
        if (!repo) {
          api.cli.outputHelp()
          return
        }

        const args = parseOptionsToArgs(options)

        clone(repo, ...args)
      })
  },
}
