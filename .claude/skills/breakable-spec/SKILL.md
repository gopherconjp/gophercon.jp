---
name: breakable-spec
description: "Re-specify Breakable break positions for page copy. Use when the user asks to redo the pipe DSL for one or more pages, wants EN and JA as separate free-text questions, or wants every question collected before replacement."
---

<!-- DO NOT EDIT: Generated from /.agents/skills/breakable-spec. Edit /.agents/skills/breakable-spec instead. -->

# Breakable spec

Follow the `breakable` instruction for the DSL grammar and conversion. This skill defines scope and the question flow only.

## Scope

- Unit is a page route (e.g. `/2027/cfp`); accept one or more and dedupe. If none are given, ask for them.
- Resolve the component directory from the page file's imports, not from the route segment (`/2027/cfp` may import `components/2027/cfp-closed/`).
- Collect every `*.content.ts` under that directory. Only `t<Breakable>` fields are in scope; skip plain `t({...})` strings.
- Order: pages as listed; within a page, composition order (`index`, `Section1`, `Section2`, ...), then declaration order. Subdirectories follow usage order, else path order.
- List the discovered files and fields before asking. Stop and ask if the scope or order is ambiguous.

## Ask first, replace later

- Ask every field for the whole scope before the first edit.
- Ask in chat, not via a single-line question tool: post one block per file per locale per field so the user can see and edit multiple lines at once. If the scope is large, split by page, but finish all answers before editing.
- One block covers exactly one file, one locale, and one field. Never combine files, locales, or fields in one block or one tool question.
- If the user stops replying, make no edits; report the unanswered fields.

## Question format

One chat block per file per locale per field:

```text
## <page> / <file> / <field> (<locale>) の区切りを指定して下さい。

現在の文章:
<rendered copy>

おすすめの区切り:
<recommended DSL>
```

Ask the user to reply with one code block containing only the DSL:

```text
<DSL>
```

- `現在の文章` is the rendered copy, not the AST.
- `おすすめの区切り` is break-only by default. Keep existing `[...]` links and `*...*` accents; don't add new ones unless asked. A new link needs an href.
- Recommend `\n` at sentence/paragraph boundaries, then `||` and `|` at phrase boundaries.
- Empty, `そのまま`, or `変更なし` keeps the current AST for that field/locale.

## Apply

1. Convert each answer per the `breakable` instruction's Procedure.
2. Invalid DSL: report the case and correct format, then re-ask only that field/locale.
3. Apply in question order with `replace_string_in_file`; change only the target field. JA uses `space={false}` — do not add spaces between JA chunks.
4. If the answer's plain text differs from the current copy, treat it as an intentional copy change and list the diff in the final report.
5. Verify: `bun run format`, `bun run check`, `bun run knip`, `bun run lint`, `bun run build`; preview changed pages in the browser.
6. Report applied DSL per field and any items left unchanged.
