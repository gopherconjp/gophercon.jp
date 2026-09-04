# Design

A self-hosted [Penpot](https://penpot.app/) with its built-in MCP server.  
Design files are versioned per year as snapshots in `snapshot/`.

## Quick start

```sh
# 1. Start the stack (first run pulls images, creates the account + files)
bun run penpot

# 2. Sign in at http://localhost:9001 with creative@gophercon.jp / password.

# 3. Then enable MCP: Account -> Integrations -> MCP Server (generate a key).
bun run penpot:mcp   # paste the URL it shows -> .vscode/mcp.json

# 4. Reload VS Code, focus the design file in Penpot, and ask Copilot Chat.

# 5. When done, save the design to git.
bun run penpot:export
```

## Commands

Run these from the repo root. `export` / `import` take an optional file name (default: all files in `cfg.files`).

| Command                 | What it does                                                              |
| ----------------------- | ------------------------------------------------------------------------- |
| `bun run penpot`        | Starts the stack, restores missing files from `snapshot/`, uploads fonts. |
| `bun run penpot:export` | Exports the design to `snapshot/<file>.penpot`.                           |
| `bun run penpot:import` | Force-restores `snapshot/<file>.penpot` (asks for confirmation first).    |
| `bun run penpot:mcp`    | Writes the MCP URL into `.vscode/mcp.json`.                               |
| `bun run penpot:down`   | Stops the stack; volumes and snapshots are kept.                          |
| `bun run penpot:reset`  | Wipes all Penpot data (docker volumes, DB wiped); snapshots are kept.     |

The local stack uses the fixed account `creative@gophercon.jp` / `password`.

## MCP

- MCP acts on the page currently focused in the active Penpot tab, so keep the design file open there.
- Start read-only (e.g. "analyze this page") before any write.
- `.vscode/` is git-ignored, so the MCP key never lands in the repository.

## Saving / restoring

- `bun run penpot:export` overwrites `snapshot/<file>.penpot`; commit the change to save it.
- `bun run penpot` auto-imports the snapshot when the design file is missing; creates an empty file if no snapshot exists.
- Fonts in `public/font/` are uploaded automatically by `penpot` / `penpot:import`; do not upload manually.

## Updating / resetting

```sh
bun run penpot:down && bun run penpot   # apply version bumps
bun run penpot:reset && bun run penpot  # full reset (DB wiped)
```

## Layout

| Path                    | What it is                                                               |
| ----------------------- | ------------------------------------------------------------------------ |
| `compose.yaml`          | Whole stack: Penpot + built-in MCP + Postgres + Valkey                   |
| `scripts/`              | `up` / `export` / `import` / `mcp` / `down` / `reset`, helpers in `lib`  |
| `scripts/lib/config.ts` | Source of truth: `cfg.files` defines the design files                    |
| `snapshot/*.penpot`     | Exported snapshots, one per design file (e.g. `gopherconjp-2027.penpot`) |
