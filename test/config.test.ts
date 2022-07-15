import { describe, expect, test } from "vitest";
import { readUserConfig, userConfigFilePath } from "../src/config";
import { exists } from "../src/fs";

describe("user config", async () => {
  const existsConfigFile = await exists(userConfigFilePath);

  test.runIf(existsConfigFile)("assert config", async () => {
    const config = await readUserConfig();

    expect(config).toBeTypeOf("object");
  });

  test.runIf(!existsConfigFile)("no config file", async () => {
    const config = await readUserConfig();

    expect(config).toEqual({});
  });
});
