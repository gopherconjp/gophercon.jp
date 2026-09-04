---
name: cleanup-merged-branch
description: Check if the current branch has a merged PR and clean up. Use when the user asks to clean up a merged branch or after a PR merge.
---

# Cleanup Merged Branch

1. If on `main` or no PR exists for the current branch, stop.
2. If the PR is merged:
   - Stash dirty worktree if needed (`git stash`).
   - `git checkout main` → `git pull` → `git branch -d <branch>`.
   - Restore the stash if one was created (`git stash pop`).
3. Otherwise, report the state and stop.
