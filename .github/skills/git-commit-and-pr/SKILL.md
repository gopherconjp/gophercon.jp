---
name: git-commit-and-pr
description: Commit changes and create a PR. Use when the user asks to commit, push, or create a PR. Supports commit-only mode; stops after push when a PR already exists.
---

# Git Commit & PR

Only run on explicit request.

1. Merged branch PR → run `cleanup-merged-branch` first.
2. On `main` → create feature branch. Otherwise confirm current branch.
3. One commit per focused change (feature/fix/refactor/move/asset/chore), imperative, no prefix. Penpot: `bun run penpot:export` first, snapshot separately.
4. Commit before push; commit-only → stop here.
5. For push or PR:
   1. No branch name → throw an error message indicating that a branch name is required.
   2. Run `git push -u origin <branch>`.
   3. Push failure or invalid branch → error.
6. No PR without explicit request (e.g. user explicitly types `create PR` or similar). No existing PR → create (English): `gh pr create --base main --head <branch> --title ... --body ...`. No commits → error.
7. Always `gh pr merge <n> --auto --merge` (merge commit, never squash), even if PR already existed. If there are merge conflicts, notify the user and provide options to resolve them before proceeding with the merge.
