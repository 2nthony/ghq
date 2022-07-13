import { test, expect, describe } from 'vitest'
import { username } from '../src/git'
import { analyzeUrl, composeUrl } from '../src/url'

describe('analyzeUrl', () => {
  test('repo', () => {
    expect(analyzeUrl('ghq')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: username,
      name: 'ghq',
    })

    expect(analyzeUrl('ghq node')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: username,
      name: 'ghq node',
    })
  })

  test('user/repo', () => {
    expect(analyzeUrl('2nthony/ghq')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq',
    })

    expect(analyzeUrl('x-motemen/ghq')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: 'x-motemen',
      name: 'ghq',
    })

    expect(analyzeUrl('under_line/repo')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: 'under_line',
      name: 'repo',
    })

    expect(analyzeUrl('characters/my.repo')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: 'characters',
      name: 'my.repo',
    })

    expect(analyzeUrl('characters/my repo')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: 'characters',
      name: 'my repo',
    })
  })

  test('domain/user/repo', () => {
    expect(analyzeUrl('github.com/2nthony/ghq')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq',
    })
  })

  test('protocol://domain/user/repo', () => {
    expect(analyzeUrl('https://github.com/2nthony/ghq')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq',
    })
  })
})

describe('composeUrl', () => {
  test('basic', () => {
    expect(
      composeUrl({
        protocol: 'https:',
        host: 'github.com',
        user: '2nthony',
        name: 'ghq',
      }),
    ).toBe('https://github.com/2nthony/ghq')
  })
})
