import path from 'path/posix'
import { URL } from 'url'
import { Repo } from '../types'

// TODO: only github for now
const re =
  /(?:git@|https:\/\/)?(?<host>github.com)?\/?(?<user>[\w\W]+)\/(?<name>[\w\W]+)(\.git)?/

export function analyzeUrl(url: string): Repo {
  const matched = <
    RegExpExecArray & {
      groups: {
        host: string
        user: string
        name: string
      }
    }
  >re.exec(url)

  const { host = 'github.com', user, name } = matched.groups

  return {
    host,
    user,
    name,
  }
}

export function composeUrl(repo: Repo) {
  const url = new URL(repo.host)
  url.pathname = path.join(repo.user, repo.name)

  return url
}
