import { execSync, spawn as _spawn } from 'child_process'
import path from 'path'
import { promisify } from 'util'
import { existsDir, makeDir } from './fs'
import { rootPath } from './shared'
import { analyzeUrl, composeUrl } from './shared/url'
import { Repo } from './types'

const spawn = promisify(_spawn)

function userCwd(repo: Repo) {
  return path.join(rootPath, repo.host, repo.user)
}

function repoCwd(repo: Repo) {
  return path.join(userCwd(repo), repo.name)
}

function git(cmd: string, repo: Repo, ...options: string[]) {
  return spawn('git', [cmd, composeUrl(repo), ...options], {
    cwd: path.join(rootPath, repo.host, repo.user),
    stdio: [process.stdin, process.stdout, process.stderr],
  })
}

export async function clone(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)

  if (!(await existsDir(userCwd(repo)))) {
    await makeDir(userCwd(repo))
  }

  git('clone', repo, ...args)
}

export async function init(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)

  // TODO: refactor this
  if (!(await existsDir(repoCwd(repo)))) {
    await makeDir(repoCwd(repo))
  }

  git('init', repo, ...args)
}

export function getUsername() {
  try {
    const stdout = execSync('git config --get user.name')
    return stdout.toString().trim()
  } catch {
    return ''
  }
}
