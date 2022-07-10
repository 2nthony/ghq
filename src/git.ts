import { spawn } from 'child_process'
import path from 'path'
import { existsDir, makeDir } from './fs'
import { rootPath } from './shared'
import { analyzeUrl, composeUrl } from './shared/url'
import { Repo } from './types'

function cwd(repo: Repo) {
  return path.join(rootPath, repo.host, repo.user)
}

function git(cmd: string, repo: Repo, ...options: string[]) {
  spawn('git', [cmd, composeUrl(repo), ...options], {
    cwd: path.join(rootPath, repo.host, repo.user),
    stdio: [process.stdin, process.stdout, process.stderr],
  })
}

export async function clone(repoUrl: string, ...args: string[]) {
  const repo = analyzeUrl(repoUrl)

  if (!(await existsDir(cwd(repo)))) {
    await makeDir(cwd(repo))
  }

  git('clone', repo, ...args)
}
