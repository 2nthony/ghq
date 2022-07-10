import cac from 'cac'
import { commands } from './commands'
import { version } from '../package.json'

export function main() {
  const cli = cac('ghq')

  const extendApi = {
    cli,
  }

  commands.forEach((command) => {
    command.extend?.(extendApi)
  })

  cli.version(version).help().parse()

  if (!process.argv.slice(2).length) {
    cli.outputHelp()
  }
}
