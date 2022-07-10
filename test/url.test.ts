import { test, expect, describe } from 'vitest'
import { analyzeUrl } from '../src/shared/url'

describe('analyzeUrl', () => {
  test('user/rpeo', () => {
    expect(analyzeUrl('2nthony/ghq-node')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq-node',
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
  })

  test('domain/user/repo', () => {
    expect(analyzeUrl('github.com/2nthony/ghq-node')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq-node',
    })
  })

  test('protocol://domain/user/repo', () => {
    expect(analyzeUrl('https://github.com/2nthony/ghq-node')).toEqual({
      protocol: 'https:',
      host: 'github.com',
      user: '2nthony',
      name: 'ghq-node',
    })
  })
})
