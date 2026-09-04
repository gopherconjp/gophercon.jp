---
name: cleanup-merged-branch
description: Check if the current branch has a merged PR and clean up. Use when the user asks to clean up a merged branch or after a PR merge.
---

# Cleanup Merged Branch

1. If on `main` or no PR exists for the current branch (`gh pr view`), stop.
2. If the PR is merged (`state: MERGED`):
   - `git checkout main`
   - `git pull`
   - `git branch -D <branch>`
3. Otherwise, report the state and stop.
