import { CAC } from 'cac'

export type PluginApiExtend = {
  cli: CAC
}
export type PluginApi = {
  extend(api: PluginApiExtend): void
}

export type Repo = {
  host: string
  user: string
  name: string
}
