---
name: git-commit-and-pr
description: Commit changes and create a PR. Use when the user asks to commit, push, or create a PR. Supports commit-only mode and push-only when a PR already exists.
---

# Git Commit & PR

Only run when the user explicitly asks.

1. If a PR already exists for the current branch (`gh pr view`), push only and stop.
2. Create a branch if not on a feature branch.
3. Commit with logical granularity:
   - Imperative, no prefix (e.g. "Fix header alignment").
   - Penpot snapshot (`design/snapshot/<file>.penpot`) as its own commit.
4. If the user asked for commit only, stop here.
5. Push: `git push -u origin <branch>`.
6. Create the PR (English): `gh pr create --base main --head <branch> --title ... --body ...`.
7. Enable auto-merge with a merge commit, never squash: `gh pr merge <n> --auto --merge`.
