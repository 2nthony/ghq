import { CAC } from 'cac'
import { OptionalConfig } from './types'

export function parseCliOptionsToArgs(
  options: OptionalConfig & CAC['options'],
): readonly string[] {
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
