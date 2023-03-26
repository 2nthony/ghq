import { execSync, spawn } from 'node:child_process'
import { resolveConfig } from './config'
import { exists, makeDir } from './fs'
import { join } from './path'
import { analyzeUrl, composeUrl } from './url'
import type { Repo } from './types'

export async function repoDest(repo: Repo) {
  const { root } = await resolveConfig()
  return join(root, repo.host, repo.user, repo.name)
}

function git(cmd: string, dest: string, ...args: string[]) {
  spawn('git', [cmd, ...args, dest], {
    stdio: [process.stdin, process.stdout, process.stderr],
  })
}

export const username = getUsername()

export async function clone(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)
  const dest = await repoDest(repo)

  if (!(await exists(dest)))
    await makeDir(dest)

  git('clone', dest, composeUrl(repo), ...args)
}

export async function init(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)
  const dest = await repoDest(repo)

  if (!(await exists(dest)))
    await makeDir(dest)

  git('init', dest, ...args)
}

function getUsername() {
  try {
    let username = execSync('git config --get github.user').toString().trim()
    if (!username)
      username = execSync('git config --get user.name').toString().trim()

    return username
  }
  catch {
    return ''
  }
}
