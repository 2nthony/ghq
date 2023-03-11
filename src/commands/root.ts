import { resolveConfig } from '../config'
import type { PluginApi } from '../types'

export const rootCommand: PluginApi = {
  extend(api) {
    api.cli.command('root', 'Show repositories\' root').action(async () => {
      const { root } = await resolveConfig()
      console.info(root)
    })
  },
}
