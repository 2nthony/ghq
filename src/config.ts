import { homedir } from 'node:os'
import type { Config, OptionalConfig } from './types'
import { exists, read, writeJson } from './fs'
import { expandTildePath, join } from './path'
import { pick } from './helpers/pick'

export const ghqConfigFileName = '.ghqrc'
export const userConfigFilePath = join(homedir(), ghqConfigFileName)

export const defaultConfig: Config = {
  root: '~/ghq',
  shallow: false,
}

export const supportedConfigKeys = Object.keys(
  defaultConfig,
) as (keyof Config)[]

export async function resolveConfig() {
  const config = await readConfig()

  return {
    ...config,
    root: expandTildePath(config.root),
  }
}

export async function readConfig() {
  return {
    ...defaultConfig,
    ...(await readUserConfig()),
  }
}

export async function existsUserConfig() {
  return await exists(userConfigFilePath)
}

export async function readUserConfig(): Promise<OptionalConfig> {
  try {
    const rawConfig = await read(userConfigFilePath)
    return rawConfig ? JSON.parse(rawConfig) : {}
  }
  catch {
    return {}
  }
}

export async function writeUserConfig(options: OptionalConfig) {
  try {
    options = pick(options, supportedConfigKeys)

    const config = await readConfig()
    await writeJson(userConfigFilePath, {
      ...config,
      ...options,
    })
  }
  catch (e) {
    console.error(e)
  }
}

export async function printConfig<K extends keyof Config>(
  expectConfig?: OptionalConfig,
) {
  const config = await readConfig()

  for (const k of Object.keys(expectConfig ?? config)) {
    if (supportedConfigKeys.includes(k as K))
      console.info(`${k}=${config[k as K]}`)
  }
}
