---
name: git-commit-and-pr
description: Commit changes and create a PR. Use when the user asks to commit, push, or create a PR. Supports commit-only mode; stops after push when a PR already exists.
---

# Git Commit & PR

Only run when the user explicitly asks.

1. If the branch PR is merged, run `cleanup-merged-branch` first.
2. If on `main`, create a feature branch; otherwise stay on the current branch.
3. Create one commit per focused change (feature/fix/refactor/move/asset/chore), imperative, no prefix. Penpot changes: `bun run penpot:export` first, snapshot separately.
4. If the request is commit-only, stop here.
5. If the request requires push or a PR, run `git push -u origin <branch>`.
6. If a PR for the branch is already OPEN, stop here.
7. If no PR exists for the branch, create the PR (English): `gh pr create --base main --head <branch> --title ... --body ...`. If there are no commits on the branch, stop with an error instead.
8. Auto-merge with merge commit (never squash): `gh pr merge <n> --auto --merge`.
