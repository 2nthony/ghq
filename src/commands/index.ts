import { listCommand } from './list'
import { configCommand } from './config'
import { rootCommand } from './root'
import { cloneCommand } from './clone'
import { initCommand } from './init'

export const commands = [
  cloneCommand,
  initCommand,
  listCommand,
  configCommand,
  rootCommand,
]
