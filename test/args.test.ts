import { describe, expect, test } from 'vitest'
import { correctCliOptionsType, parseCliOptionsToGitArgs } from '../src/args'
import { defaultConfig } from '../src/config'

describe('parse cli options to args', () => {
  test('empty', () => {
    const args = parseCliOptionsToGitArgs(defaultConfig)
    expect(args).toEqual([])
  })

  test('shallow', () => {
    const args = parseCliOptionsToGitArgs({ ...defaultConfig, shallow: true })
    expect(args).toEqual(['--depth', 1])
  })
})

describe('correct cli options type', () => {
  test('boolean', () => {
    expect(
      correctCliOptionsType({
        // @ts-expect-error wrong shallow type
        shallow: 'true',
      }),
    ).toEqual({ shallow: true })

    expect(
      correctCliOptionsType({
        // @ts-expect-error wrong shallow type
        shallow: 'false',
      }),
    ).toEqual({ shallow: false })
  })
})
