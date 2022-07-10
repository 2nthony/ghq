import { init } from '../git'
import { PluginApi } from '../types'

export const create: PluginApi = {
  extend(api) {
    api.cli
      .command('create [repo]', 'Create a bew repository')
      .example('ghq create my-repo')
      .example('ghq create 2nthony/my-repo')
      .example('ghq create github.com/2nthony/my-repo')
      .example('ghq create https://github.com/2nthony/my-repo')
      .action((repo) => {
        if (!repo) {
          api.cli.outputHelp()
          return
        }

        init(repo)
      })
  },
}
