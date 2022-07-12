import { homedir } from 'os'
import { expect, test } from 'vitest'
import { expandTildePath, join } from '../src/path'

test('tilde path', () => {
  expect(expandTildePath('~/tilded-path')).toBe(join(homedir(), 'tilded-path'))

  expect(expandTildePath('/tilded-path')).toBe(join('/', 'tilded-path'))
})
