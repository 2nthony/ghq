import { username } from "./git";
import { Repo } from "./types";
import urlJoin from "url-join";

// TODO: only github for now
const re =
  /(?:(?<protocol>https:)\/\/)?(?<host>github.com)?\/?((?<user>[\w\W]+)\/)?(?<name>[\w\W]+)(\.git)?/;

export function analyzeUrl(url: string): Repo {
  const matched = <
    RegExpExecArray & {
      groups: {
        protocol: string;
        host: string;
        user: string;
        name: string;
      };
    }
  >re.exec(url);

  const {
    protocol = "https:",
    host = "github.com",
    user = username,
    name,
  } = matched.groups;

  return {
    protocol,
    host,
    user,
    name,
  };
}

export function composeUrl(repo: Repo) {
  const url = urlJoin(`${repo.protocol}//${repo.host}`, repo.user, repo.name);

  return url;
}
