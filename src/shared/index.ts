import { homedir } from 'os'
import path from 'path'

export const rootPath = path.join(homedir(), 'ghq')

export function parseOptionsToArgs(options: {
  [k: string]: any
}): readonly string[] {
  delete options['--']

  const args = []

  for (const [key, value] of Object.entries(options)) {
    args.push(`${key.length !== 1 ? '-' : ''}-${key}`)

    if (typeof value !== 'boolean') {
      args.push(value)
    }
  }

  return args
}
