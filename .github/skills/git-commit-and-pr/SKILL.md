---
name: git-commit-and-pr
description: Commit changes and create a PR. Use when the user asks to commit, push, or create a PR. Supports commit-only mode and push-only when a PR already exists.
---

# Git Commit & PR

Only run when the user explicitly asks.

1. If a PR exists for the current branch: if OPEN, push only and stop; if closed/merged, run `cleanup-merged-branch` first.
2. Create a branch if not on a feature branch.
3. Commit with logical granularity (imperative, no prefix): one commit per focused change (feature, fix, refactor, move, asset, chore). Split unrelated concerns even within the same files; prefer small commits that each pass checks. If a Penpot change was made, run `bun run penpot:export` first, then commit the snapshot separately.
4. If the user asked for commit only, stop here.
5. Push: `git push -u origin <branch>`.
6. Create the PR (English): `gh pr create --base main --head <branch> --title ... --body ...`.
7. Enable auto-merge automatically (merge commit, never squash): `gh pr merge <n> --auto --merge`.
