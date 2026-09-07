---
name: parallel-worktree
description: Open a separate VS Code window on a git worktree for a parallel AI agent. Use when starting concurrent agent work, isolating a branch, or opening another workspace window.
---

# Parallel Worktree

Open a sibling worktree in a new VS Code window so another agent can work on a different branch. Only run when the user explicitly asks.

1. Check `git status --porcelain` for changes:
   1. If dirty, stash (`git stash push --include-untracked`) and devise branch from diff.
   2. If clean, ask the user for the specific task, then devise branch from it.
2. Create worktree (`git worktree add ../<repo>-<suffix> -b <branch>`; pop stash there if stashed) and open it (`code --new-window ../<repo>-<suffix>`). If creation fails from permissions, notify with an error and suggest checking permissions.
3. Report path, branch, and task; user starts agent manually.
4. After merge, run `cleanup-merged-branch`.
