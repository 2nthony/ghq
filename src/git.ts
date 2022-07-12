import { execSync, spawn } from 'child_process'
import path from 'path'
import { rootPath } from './shared'
import { exists, makeDir } from './fs'
import { analyzeUrl, composeUrl } from './shared/url'
import { Repo } from './types'

export function repoDest(repo: Repo) {
  return path.join(rootPath, repo.host, repo.user, repo.name)
}

function git(cmd: string, dest: string, ...args: string[]) {
  spawn('git', [cmd, ...args, dest], {
    stdio: [process.stdin, process.stdout, process.stderr],
  })
}

export const username = getUsername()

export async function clone(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)
  const dest = repoDest(repo)

  if (!(await exists(dest))) {
    await makeDir(dest)
  }

  git('clone', dest, composeUrl(repo), ...args)
}

export async function init(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)
  const dest = repoDest(repo)

  if (!(await exists(dest))) {
    await makeDir(dest)
  }

  git('init', dest, ...args)
}

function getUsername() {
  try {
    const stdout = execSync('git config --get user.name')
    return stdout.toString().trim()
  } catch {
    return ''
  }
}
