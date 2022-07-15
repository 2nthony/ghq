import { CAC } from "cac";
import { defaultConfig } from "./config";
import { omit } from "./helpers/omit";
import { OptionalConfig } from "./types";

export function parseCliOptionsToGitArgs(
  options: OptionalConfig & CAC["options"],
): readonly string[] {
  delete options["--"];

  const args = [];

  if (options.shallow) {
    args.push("--depth", 1);
  }

  // clean
  options = omit(options, Object.keys(defaultConfig));

  for (const [key, value] of Object.entries(options)) {
    args.push(`${key.length !== 1 ? "-" : ""}-${key}`);

    // drop `true` and `false`
    if (typeof value !== "boolean") {
      args.push(value);
    }
  }

  return args;
}
