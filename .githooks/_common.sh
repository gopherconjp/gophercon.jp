#!/bin/bash
# Never fail the git operation; warn instead when install fails.

MANIFESTS=(package.json bun.lock)

enter_root() {
  local root
  root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
  if [[ -n "$root" ]]; then
    cd "$root" || true
  fi
}

run_install() {
  if ! command -v bun >/dev/null 2>&1; then
    echo "[githooks] bun not found, skipping install (run: mise install)" >&2
  elif bun install; then
    git hash-object "${MANIFESTS[@]}" >node_modules/.githooks-installed 2>/dev/null || true
  else
    rm -f node_modules/.githooks-installed
    echo "[githooks] bun install failed, continuing" >&2
  fi
}

install_incomplete() {
  if [[ ! -d "node_modules" ]]; then
    echo "[githooks] node_modules missing, running bun install ..."
    run_install
  else
    local current
    current="$(git hash-object "${MANIFESTS[@]}" 2>/dev/null || true)"
    local recorded
    recorded="$(cat node_modules/.githooks-installed 2>/dev/null || true)"

    if [[ -z "$current" || "$current" != "$recorded" ]]; then
      echo "[githooks] dependencies out of sync, running bun install ..."
      run_install
    fi
  fi
}

sync_deps() {
  enter_root
  install_incomplete
}
