import path from 'path'
import { homedir } from 'os'

export function expandTildePath(pathWithTilde: string) {
  if (pathWithTilde[0] === '~') {
    pathWithTilde = join(homedir(), pathWithTilde.slice(1))
  }

  return path.normalize(pathWithTilde)
}

export function join(...p: string[]) {
  return path.normalize(path.join(...p))
}
