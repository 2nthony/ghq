# ghq

[![version](https://img.shields.io/npm/v/ghq-node?label=&color=29BC9B)](https://npm.im/ghq-node) [![downloads](https://img.shields.io/npm/dm/ghq-node?label=&color=29BC9B)](https://npm.im/ghq-node)

[ghq](https://github.com/x-motemen/ghq)(Node.js implemented) - Remote repositories manager.

## Usage

```bash
# global install
npm i -g ghq-node
$ ghq

# one-time usage
npx ghq-node
```

```console
ghq/1.0.1

Usage:
  $ ghq <command> [options]

Commands:
  get [repo]     Clone/sync with a remote repository
  list [query]   List local repositories
  create [repo]  Create a bew repository
  root           Show repositories' root

For more info, run any command with the `--help` flag:
  $ ghq get --help
  $ ghq list --help
  $ ghq create --help
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
    │   ├── ghq
    │   └── vercel-toast
    ├── ravenxrz
    │   └── dotfiles
    └── vuejs
        └── vue
```

## Sponsors

[![sponsors](https://cdn.jsdelivr.net/gh/2nthony/sponsors-image/sponsors.svg)](https://github.com/sponsors/2nthony)

## License

MIT &copy; [2nthony](https://github.com/sponsors/2nthony)
