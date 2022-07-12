import { Config, OptionalConfig } from './types'
import { homedir } from 'os'
import { read, writeJson } from './fs'
import { expandTildePath, join } from './path'

const ghqConfigFileName = '.ghqrc'
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

export async function readUserConfig(): Promise<OptionalConfig> {
  const rawConfig = await read(userConfigFilePath)

  if (!rawConfig) {
    console.info(
      '`' + ghqConfigFileName + '` file not found!',
      'Fallback to default configs.\n',
    )
    return {}
  }

  try {
    return JSON.parse(rawConfig)
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