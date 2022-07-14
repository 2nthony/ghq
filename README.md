<!-- ![ghq](https://cdn.jsdelivr.net/gh/2nthony/statics@main/uPic/ghq-readmewi4t4S.png) -->

# ghq

[![version](https://img.shields.io/npm/v/ghq-node?label=&color=29BC9B)](https://npm.im/ghq-node) [![downloads](https://img.shields.io/npm/dm/ghq-node?label=&color=29BC9B)](https://npm.im/ghq-node)

[ghq](https://github.com/x-motemen/ghq)(Node.js implemented) - **G**it**H**ub repositories **Q**uery manager.

## Features

- Light-weight. No dependency, just a **10+ Kb** single file.
- Git similar. Subcommands like `get` alias to `clone`.
- One-time usage. Via `npx`.

## Prerequisites

- [Git](https://git-scm.com/) CLI installed.
- Node.js

## Usage

```bash
# global install
npm i -g ghq-node
$ ghq

# one-time usage, RECOMMENDED
npx ghq-node
```

```
ghq/0.0.0

Usage:
  $ ghq <command> [options]

Commands:
  get [repo]     Clone/sync with a remote repository
  create [repo]  Create a new repository
  list [query]   List local repositories
  config         Manage the ghq configuration file
  root           Alias to `ghq config --get.root`

For more info, run any command with the `--help` flag:
  $ ghq get --help
  $ ghq create --help
  $ ghq list --help
  $ ghq config --help
  $ ghq root --help

Options:
  -v, --version  Display version number
  -h, --help     Display this message
```

## Directory

```
~/ghq
└── github.com
    ├── 2nthony
    │   ├── dotfiles
    │   ├── ghq
    │   └── vercel-toast
    ├── ravenxrz
    │   └── dotfiles
    └── vuejs
        └── vue
```

## Inspirations

- [x-motemen/ghq](https://github.com/x-motemen/ghq)

## Sponsors

[![sponsors](https://cdn.jsdelivr.net/gh/2nthony/sponsors-image/sponsors.svg)](https://github.com/sponsors/2nthony)

## License

MIT &copy; [2nthony](https://github.com/sponsors/2nthony)
