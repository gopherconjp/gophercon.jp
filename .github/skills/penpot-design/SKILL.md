---
name: penpot-design
description: "Edit Penpot designs via the MCP plugin. Use when changing a Penpot design, creating variants, adjusting spacing, or syncing design tokens to code."
---

# Penpot Design

Run only when the user explicitly asks for a design change. Mechanics live in `penpot-design` instructions; per-file page rules in `penpot-page-shared` (`gopherconjp`) / `penpot-page-2027` (`gopherconjp-2027`) — confirm `penpot.currentFile.name` first.

## Procedure

1. Read the high-level overview; work via `execute_code` with ids in `storage`; prefer `penpotUtils`; `openPage` before edits.
2. Follow `penpot-design` instructions for frames, edits, text, tokens, components.
3. Follow the matching `penpot-page-*` instructions for boards, sections, assembly.
4. Verify: `export_shape` PNG check; `penpot:export` plus snapshot commit, never skip; `check` / `lint` / `format`; `build` plus `preview` for Astro/design. After edits, verify propagation to instances and report code-design diffs before fixing.
