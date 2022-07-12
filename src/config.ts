import { Config, OptionalConfig } from './types'
import { homedir } from 'os'
import { exists, read, writeJson } from './fs'
import { expandTildePath, join } from './path'

export const ghqConfigFileName = '.ghqrc'
export const userConfigFilePath = join(homedir(), ghqConfigFileName)

const defaultConfig: Config = {
  root: '~/ghq',
}

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
  } catch {
    return {}
  }
}

export async function writeUserConfig<K extends keyof Config>(
  key: K,
  value: Config[K],
) {
  try {
    const config = await readConfig()
    await writeJson(userConfigFilePath, {
      ...config,
      [key]: value,
    })
  } catch (e) {
    console.error(e)
  }
}

export async function printConfig(key?: keyof Config) {
  const config = await readConfig()

  if (key) {
    console.info(config[key] ?? '')
    return
  }

  for (const [k, v] of Object.entries(config)) {
    console.info(`${k}=${v}`)
  }
}
