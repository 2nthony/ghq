import { clone } from '../git'
import { parseOptionsToArgs } from '../shared'
import { PluginApi } from '../types'

export const get: PluginApi = {
  extend(api) {
    api.cli
      .command('get [repo]', 'Clone/sync with a remote repository')
      .example('ghq get 2nthony/ghq-node')
      .example('ghq get github.com/2nthony/ghq-node')
      .example('ghq get https://github.com/2nthony/ghq-node')
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
