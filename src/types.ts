import type { CAC } from 'cac'

export interface PluginApiExtend {
  cli: CAC
}
export interface PluginApi {
  extend(api: PluginApiExtend): void
}

export interface Repo {
  protocol: string
  host: string
  user: string
  name: string
}

export interface Config {
  root: string
  shallow: boolean
}

export type OptionalConfig = Partial<Config>
