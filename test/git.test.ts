import { describe, expect, test } from "vitest";
import { resolveConfig } from "../src/config";
import { repoDest, username } from "../src/git";
import { join } from "../src/path";
import { analyzeUrl } from "../src/url";

describe("repo dest", async () => {
  const { root } = await resolveConfig();

  test("repo", async () => {
    const repo = analyzeUrl("ghq");

    expect(await repoDest(repo)).toBe(join(root, repo.host, username, "ghq"));
  });

  test("user/repo", async () => {
    const repo = analyzeUrl(`${username}/ghq`);

    expect(await repoDest(repo)).toBe(join(root, repo.host, username, "ghq"));
  });

  test("protocol://domain/user/repo", async () => {
    const repo = analyzeUrl(`https://github.com/${username}/ghq`);

    expect(await repoDest(repo)).toBe(join(root, repo.host, username, "ghq"));
  });
});
