import { homedir } from 'os'
import path from 'path'
import { expect, test } from 'vitest'
import { expandTildePath } from '../src/path'

test('tilde path', () => {
  expect(expandTildePath('~/tilded-path')).toBe(
    path.join(homedir(), 'tilded-path'),
  )

  expect(expandTildePath('/tilded-path')).toBe(path.join('/', 'tilded-path'))
})
