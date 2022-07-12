import { printConfig, writeUserConfig } from '../config'
import { Config, OptionalConfig, PluginApi } from '../types'

export const config: PluginApi = {
  extend(api) {
    api.cli
      .command('config', 'Manage the ghq configuration file')
      .option('--set <value>', 'Set a variable')
      .example('ghq config --set.root ~/my-path')
      .option('--get <value>', 'Get a variable')
      .example('ghq config --get.root')
      .option('-l, --list', 'List all')
      .action(async (options) => {
        if (options.list) {
          await printConfig()
          return
        }

        if (options.set) {
          const { key, value } = firstArgPairs(options.set)
          await writeUserConfig(key, value)
          await printConfig(key)
          return
        }

        if (options.get) {
          const { key } = firstArgPairs(options.get)
          await printConfig(key)
          return
        }

        api.cli.outputHelp()
      })
  },
}

function firstArgPairs<K extends keyof Config>(optionalConfig: OptionalConfig) {
  const [[key, value] = []] = Object.entries(optionalConfig)

  return {
    key,
    value,
  } as { key: K; value: Config[K] }
}
