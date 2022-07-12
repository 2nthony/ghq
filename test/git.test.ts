import path from 'path'
import { describe, expect, test } from 'vitest'
import { resolveConfig } from '../src/config'
import { repoDest, username } from '../src/git'
import { analyzeUrl } from '../src/shared/url'

describe('repo dest', async () => {
  const { root } = await resolveConfig()

  test('repo', async () => {
    const repo = analyzeUrl('ghq')

    expect(await repoDest(repo)).toBe(
      path.join(root, repo.host, username, 'ghq'),
    )
  })

  test('user/repo', async () => {
    const repo = analyzeUrl(`${username}/ghq`)

    expect(await repoDest(repo)).toBe(
      path.join(root, repo.host, username, 'ghq'),
    )
  })

  test('protocol://domain/user/repo', async () => {
    const repo = analyzeUrl(`https://github.com/${username}/ghq`)

    expect(await repoDest(repo)).toBe(
      path.join(root, repo.host, username, 'ghq'),
    )
  })
})
