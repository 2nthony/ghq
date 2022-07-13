import { CAC } from 'cac'

export type PluginApiExtend = {
  cli: CAC
}
export type PluginApi = {
  extend(api: PluginApiExtend): void
}

export type Repo = {
  protocol: string
  host: string
  user: string
  name: string
}

export type Config = {
  root: string
  shallow: boolean
}

export type OptionalConfig = Partial<Config>
