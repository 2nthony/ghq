import { rootPath } from '../shared'
import { PluginApi } from '../types'

export const root: PluginApi = {
  extend(api) {
    api.cli
      .command('root', "Show repositories' root (un-implemented)")
      .action(() => {
        console.info(rootPath)
      })
  },
}
