import { afterEach, beforeEach, describe, expect, test } from "vitest";
import os from "os";
import fs from "fs/promises";
import { collectDirs, makeDir } from "../src/fs";
import { join } from "../src/path";

describe("collect dirs", () => {
  const tmpdir = os.tmpdir();
  const test_dir_base = join(tmpdir, "ghq");
  const test_dir = join(test_dir_base, "deep2", "deep3", "deep4");

  beforeEach(async () => {
    await makeDir(test_dir);
  });

  afterEach(async () => {
    await fs.rm(join(test_dir_base), {
      recursive: true,
      force: true,
    });
  });

  test("1", async () => {
    const dirs = await collectDirs(test_dir_base);
    expect(dirs).toContain(join(test_dir_base));
  });

  test("3", async () => {
    const dirs = await collectDirs(test_dir_base, 3);
    expect(dirs).toContain(join(test_dir_base, "deep2", "deep3"));
  });

  test("4", async () => {
    const dirs = await collectDirs(test_dir_base, 4);
    expect(dirs).toContain(join(test_dir_base, "deep2", "deep3", "deep4"));
  });

  test("over deep will be empty", async () => {
    const dirs = await collectDirs(test_dir_base, 5);
    expect(dirs).toEqual([]);
  });
});
