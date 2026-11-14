# Worktree names

A [Paseo](https://paseo.sh) plugin that gives each new worktree folder a readable name.

Paseo gives a new worktree a random folder name, for example `modern-bobcat`. Flowly cards get a name from the branch, for example `kanban-worktree-naming-0b7eb0`. This plugin changes the folder name to `<repository-folder>-<2 or 3 words>`, for example `custom-models-credit-balance-guard`.

## What it does

The plugin runs before Paseo creates a worktree workspace (hook `workspace.create.before`).

1. It reads the name of the repository folder and makes the prefix, for example `custom-models-`.
2. It takes the text to name:
   - the first prompt of the agent, or
   - the workspace title when there is no prompt (for example the title of a Flowly card).
3. It asks Claude Haiku for 2 or 3 words that name the feature. The call uses the local `claude` command with no settings, tools, MCP servers or project files.
4. It sets the folder name to `<prefix><words>`. If the name is taken, it adds `-2`, `-3` and so on.

The plugin changes only the folder name. The git branch name stays as Paseo or Flowly set it.

If there is no prompt and no title, or the Haiku call fails, the folder keeps the Paseo name with the prefix added, for example `custom-models-modern-bobcat`. A name that already starts with the prefix stays as it is. An error in the plugin never stops the worktree creation.

## Requirements

- Paseo 0.15.0 or later.
- Node.js and npm.
- The Claude Code command line (`claude`), signed in. The plugin looks for it at `~/.local/bin/claude`. To use another path, set `WORKTREE_NAMES_CLAUDE` in the environment of the Paseo daemon.

## Install

Install from a local folder. This is the tested way.

1. Get the code and install the dependencies:

   ```sh
   git clone git@github.com:koval-yurko/paseo-worktree-names.git
   cd paseo-worktree-names
   npm install
   ```

2. Install the plugin in Paseo from this folder:

   ```sh
   paseo plugin install "$(pwd)"
   ```

3. Make sure that the plugin runs:

   ```sh
   paseo plugin ls worktree-names
   ```

   The status must be `running` and the error column must be empty.

You can also install from Git with `paseo plugin install https://github.com/koval-yurko/paseo-worktree-names.git`. This way is not tested.

## Check that it works

Create a worktree workspace in Paseo, or a Flowly card in worktree mode. Then read the plugin log:

```sh
paseo plugin logs worktree-names
```

A line such as `Worktree folder named custom-models-test-worktree-name` shows the new name.

## Update, disable or remove

After you change the code, reload the plugin:

```sh
paseo plugin reload worktree-names
```

To stop the plugin, run `paseo plugin disable worktree-names`. To remove it, run `paseo plugin remove worktree-names`.

## Develop

```sh
npm run typecheck   # TypeScript check
npm test            # unit tests (node --test)
```

The naming rules are in `server/slug.ts`, and their tests are in `server/slug.test.ts`. The hook is in `index.server.ts`.
