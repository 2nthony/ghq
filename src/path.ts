import path from 'path'
import { homedir } from 'os'

export function expandTildePath(pathWithTilde: string) {
  if (pathWithTilde[0] === '~') {
    pathWithTilde = path.join(homedir(), pathWithTilde.slice(1))
  }

  return pathWithTilde
}
