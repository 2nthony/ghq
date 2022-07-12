import { resolveConfig } from '../config'
import { PluginApi } from '../types'

export const root: PluginApi = {
  extend(api) {
    api.cli.command('root', 'Alias to `ghq config --get.root`').action(() => {
      const { root } = resolveConfig()
      console.info(root)
    })
  },
}
