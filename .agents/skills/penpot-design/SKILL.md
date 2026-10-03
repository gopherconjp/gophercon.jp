---
name: penpot-design
description: "Edit Penpot designs via the MCP plugin. Use when changing a Penpot design, creating variants, adjusting spacing, or syncing design tokens to code."
---

# Penpot Design

Run only when the user explicitly asks for a design change. Use `penpot-design` instructions for mechanics; use `penpot-page-shared` for `gopherconjp` or `penpot-page-2027` for `gopherconjp-2027` for page rules — confirm that `penpot.currentFile.name` matches the expected design file name before proceeding.

## Procedure

1. Read the high-level overview (workflow mechanics per `penpot-design` Preconditions).
2. Follow `penpot-design` instructions for frames, edits, text, tokens, components.
3. If the confirmed file is `gopherconjp`, follow `penpot-page-shared`; if it is `gopherconjp-2027`, follow `penpot-page-2027` for boards, sections, assembly.
4. Verify: `export_shape` PNG check; `penpot:export`. After edits, verify propagation to instances and report code-design diffs before fixing.
