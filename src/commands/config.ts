import {
  defaultConfig,
  existsUserConfig,
  ghqConfigFileName,
  printConfig,
  supportedConfigKeys,
  writeUserConfig,
} from '../config'
import type { PluginApi } from '../types'
import { correctCliOptionsType } from '../args'

export const configCommand: PluginApi = {
  extend(api) {
    const commandCli = api.cli
      .command('config', 'Manage the ghq configuration file')
      .option('--set <value>', 'Set a variable')
      .option('--get', 'Get a variable')
      .option('-l, --list', 'List all')
      .action(async (options) => {
        if (!(await existsUserConfig())) {
          console.info(
            `\`${ghqConfigFileName}\` file not found!`,
            'Fallback to default configs.\n',
          )
        }

        if (options.list) {
          await printConfig()
          return
        }

        if (options.set) {
          const correctTypedOptions = correctCliOptionsType(options.set)
          await writeUserConfig(correctTypedOptions)
          await printConfig(options.set)
          return
        }

        if (options.get) {
          await printConfig(options.get)
          return
        }

        api.cli.outputHelp()
      })

    supportedConfigKeys.forEach((k) => {
      commandCli.example(`ghq config --set.${k} [${typeof defaultConfig[k]}]`)
      commandCli.example(`ghq config --get.${k}`)
    })
  },
}
