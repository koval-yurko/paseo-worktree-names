# Worktree names

Names every new Paseo worktree folder `<repository-folder>-<2 or 3 words>`, for example `ipd-nearform-credit-balance-guard`.

Claude Haiku picks the words from the first prompt. When the request has no prompt, for example a Flowly card, it uses the workspace title. It runs through the local `claude` command line with no settings, tools or project files. Without a prompt or a title, or if the call fails, the folder keeps Paseo's random name with the prefix added, for example `ipd-nearform-modern-bobcat`. A slug that already starts with the prefix stays as it is. A name that is already taken gets `-2`, `-3` and so on.

Set `WORKTREE_NAMES_CLAUDE` to use a `claude` binary outside `~/.local/bin`.
