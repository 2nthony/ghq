import { resolveConfig } from "../config";
import { PluginApi } from "../types";

export const root: PluginApi = {
  extend(api) {
    api.cli.command("root", `Show repositories' root`).action(async () => {
      const { root } = await resolveConfig();
      console.info(root);
    });
  },
};
