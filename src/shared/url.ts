import path from 'path/posix'
import { URL } from 'url'
import { username } from '../git'
import { Repo } from '../types'

// TODO: only github for now
const re =
  /(?:(?<protocol>https:)\/\/)?(?<host>github.com)?\/?((?<user>[\w\W]+)\/)?(?<name>[\w\W]+)(\.git)?/

export function analyzeUrl(url: string): Repo {
  const matched = <
    RegExpExecArray & {
      groups: {
        protocol: string
        host: string
        user: string
        name: string
      }
    }
  >re.exec(url)

  const {
    protocol = 'https:',
    host = 'github.com',
    user = username,
    name,
  } = matched.groups

  return {
    protocol,
    host,
    user,
    name,
  }
}

export function composeUrl(repo: Repo) {
  const url = new URL(repo.protocol + '//' + repo.host)
  url.pathname = path.join(repo.user, repo.name)

  return url.toString()
}
