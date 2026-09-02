# Design

A self-hosted [Penpot](https://penpot.app/) with its built-in MCP server.  
The design is exported to a single git-managed snapshot.

## Quick start

```sh
# 1. Start the stack (first run pulls images, creates the account + file)
bun run penpot

# 2. Sign in at http://localhost:9001 with creative@gophercon.jp / password.

# 3. Then enable MCP: Account -> Integrations -> MCP Server (generate a key).
bun run penpot:mcp   # paste the URL it shows -> .vscode/mcp.json

# 4. Reload VS Code, focus the design file in Penpot, and ask Copilot Chat.

# 5. When done, save the design to git.
bun run penpot:export
```

## Commands

Run these from the repo root.

| Command                 | What it does                                         |
| ----------------------- | ---------------------------------------------------- |
| `bun run penpot`        | Starts the stack and prints the next steps.          |
| `bun run penpot:export` | Exports the design to `snapshot/gopherconjp.penpot`. |
| `bun run penpot:mcp`    | Writes the MCP URL into `.vscode/mcp.json`.          |
| `bun run penpot:down`   | Stops the stack; volumes and snapshot are kept.      |

Account defaults are `creative@gophercon.jp` / `password`, overridable with `PENPOT_*` env vars.

## MCP

- MCP acts on the page currently focused in the active Penpot tab, so keep the design file open there.
- Start read-only (e.g. "analyze this page") before any write.
- `.vscode/` is git-ignored, so the MCP key never lands in the repository.

## Saving / restoring the design

- `bun run penpot:export` overwrites `design/snapshot/gopherconjp.penpot`; commit the change to save it.
  - Use Git LFS if the file grows large.
- `bun run penpot` auto-imports the snapshot whenever the design file is missing (fresh volume or checkout).

## Updating / resetting

apply version bumps

```sh
bun run penpot:down && bun run penpot
```

full reset (DB wiped)

```sh
docker compose -f design/compose.yaml -p penpot down -v
```

## Layout

| Path                          | What it is                                                                  |
| ----------------------------- | --------------------------------------------------------------------------- |
| `compose.yaml`                | Whole stack: Penpot + built-in MCP + Postgres + Valkey                      |
| `scripts/`                    | TS commands: `up.ts` / `export.ts` / `mcp.ts` / `down.ts`, helpers in `lib` |
| `snapshot/gopherconjp.penpot` | Exported design snapshot (stable file name)                                 |
