import type { PluginApi } from '../types'
import { init } from '../git'

export const initCommand: PluginApi = {
  extend(api) {
    api.cli
      .command('init [repo]', 'Init a new repository')
      .alias('create')
      .example('ghq init my-repo')
      .example('ghq init 2nthony/my-repo')
      .example('ghq init my-org/my-repo')
      .example('ghq init github.com/2nthony/my-repo')
      .example('ghq init https://github.com/2nthony/my-repo')
      .action((repo) => {
        if (!repo) {
          api.cli.outputHelp()
          return
        }

        init(repo)
      })
  },
}
