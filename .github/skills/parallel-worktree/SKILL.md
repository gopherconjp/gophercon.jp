---
name: parallel-worktree
description: Open a separate VS Code window on a git worktree for a parallel AI agent. Use when starting concurrent agent work, isolating a branch, or opening another workspace window.
---

# Parallel Worktree

Open a sibling worktree in a new VS Code window so another agent can work on a different branch. Only run when the user explicitly asks.

1. Check `git status --porcelain`:
   1. If dirty, stash (`git stash push --include-untracked`) and devise branch from diff.
   2. If clean, ask task, then devise branch.
2. Create worktree:
   1. Add (`git worktree add ../<repo>-<suffix> -b <branch>`); pop stash there if stashed.
   2. Copy setup dirs (`for d in node_modules .vscode; do [ -e ../<repo>/$d ] && cp -R ../<repo>/$d ../<repo>-<suffix>/$d; done`).
   3. Open (`code --new-window ../<repo>-<suffix>`).
   4. If no branch exists, notify and suggest creating one first.
   5. If creation fails on permissions, notify and suggest checking them.
3. Return to the main worktree (`cd` back, verify `main` and clean).
4. Report path, branch, and task; user starts agent manually.
5. After merge, run `cleanup-merged-branch`.
