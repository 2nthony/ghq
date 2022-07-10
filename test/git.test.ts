import path from 'path'
import { describe, expect, test } from 'vitest'
import { repoDest, username } from '../src/git'
import { rootPath } from '../src/shared'
import { analyzeUrl } from '../src/shared/url'

describe('repo dest', () => {
  test('repo', () => {
    const repo = analyzeUrl('ghq')

    expect(repoDest(repo)).toBe(path.join(rootPath, repo.host, username, 'ghq'))
  })

  test('user/repo', () => {
    const repo = analyzeUrl(`${username}/ghq`)

    expect(repoDest(repo)).toBe(path.join(rootPath, repo.host, username, 'ghq'))
  })

  test('protocol://domain/user/repo', () => {
    const repo = analyzeUrl(`https://github.com/${username}/ghq`)

    expect(repoDest(repo)).toBe(path.join(rootPath, repo.host, username, 'ghq'))
  })
})
