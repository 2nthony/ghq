import { clone } from "../git";
import { parseCliOptionsToGitArgs } from "../args";
import { PluginApi } from "../types";
import { readConfig } from "../config";

export const cloneCommand: PluginApi = {
  extend(api) {
    api.cli
      .command("clone [repo]", "Clone/sync with a remote repository")
      .alias("get")
      .option("--shallow", "Shallow clone, alias to `--depth 1`", {
        default: false,
        type: [Boolean],
      })
      .ignoreOptionDefaultValue()
      .example("ghq clone 2nthony/ghq")
      .example("ghq clone github.com/2nthony/ghq")
      .example("ghq clone https://github.com/2nthony/ghq")
      .example("ghq get 2nthony/ghq")
      .action(async (repo, options) => {
        if (!repo) {
          api.cli.outputHelp();
          return;
        }

        const config = await readConfig();
        const args = parseCliOptionsToGitArgs({ ...config, ...options });

        clone(repo, ...args);
      });
  },
};
