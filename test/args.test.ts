import { describe, expect, test } from "vitest";
import { parseCliOptionsToGitArgs } from "../src/args";
import { defaultConfig } from "../src/config";

describe("parse cli options to args", () => {
  test("empty", () => {
    const args = parseCliOptionsToGitArgs(defaultConfig);
    expect(args).toEqual([]);
  });

  test("shallow", () => {
    const args = parseCliOptionsToGitArgs({ ...defaultConfig, shallow: true });
    expect(args).toEqual(["--depth", 1]);
  });
});
