import type { PluginApi } from '../types'
import { resolveConfig } from '../config'

export const rootCommand: PluginApi = {
  extend(api) {
    api.cli.command('root', "Show repositories' root").action(async () => {
      const { root } = await resolveConfig()
      console.info(root)
    })
  },
}
