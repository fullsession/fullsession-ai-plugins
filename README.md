# FullSession AI plugins

Listing packages that bring FullSession into AI assistants: the **ChatGPT / Codex plugin** (OpenAI) and, later, the **Claude plugin** (Anthropic).

A plugin contains no application code. It is a small package of static files (a manifest, skills and images) that points the assistant at FullSession's hosted MCP server:

- MCP server: `https://app.fullsession.io/mcp` (lives in the `FServiceProvider` repo, under `src/mcp`)
- Plan and decisions: `FServiceProvider/docs/chatgpt-app-plan.md`

## Layout

```
shared/                 content written once, used by every platform
  skills/<name>/SKILL.md  playbooks that teach the model how to use FullSession's tools
  assets/                 icons, logos, screenshots
openai/                 OpenAI-specific files (plugin.json, mcp.json, listing copy, test cases)
anthropic/              Anthropic-specific files (.claude-plugin/plugin.json, .mcp.json), later
dist/                   built packages (zips), not committed
```

Each platform's package is assembled from `shared/` plus its own folder.

## Platform formats

| | OpenAI (ChatGPT / Codex) | Anthropic (Claude) |
|---|---|---|
| Manifest | `plugin.json` (Codex: `.codex-plugin/plugin.json`) | `.claude-plugin/plugin.json` |
| MCP server | `mcp.json` (Codex: `.mcp.json`) | `.mcp.json` |
| Skills | `skills/<name>/SKILL.md` | `skills/<name>/SKILL.md` |
| Images | `assets/` | `assets/` |
| Submitted at | platform.openai.com/plugins | (to be confirmed) |

## Build

Requires Node and `zip`.

```bash
node build.mjs                                   # production package → dist/fullsession-openai-<version>.zip
node build.mjs --mcp-url https://<ngrok>/mcp     # test package pointing at a local server → dist/fullsession-local-…zip
node build.mjs --strict                          # fail if any TODO( markers remain (use before submitting)
```

The build checks the OpenAI limits (name and description lengths, exactly 5 positive and 3 negative test cases), skill frontmatter and image paths, and lists remaining `TODO(...)` markers.

To try a package in ChatGPT: Plugins → Add → **Upload plugin archive**, then pick the zip.

## Assets

- `shared/assets/icon.png`, `icon-dark.png`: square app icon (512×512), used as both the listing logo and the composer icon. Rendered from `source/icon*.svg`.
- `shared/assets/source/wordmark*.png`, `logo-*.svg`: the full "fullsession" wordmark from fullsession.io. Not usable as the listing logo (must be square); kept for screenshots and docs.
- Screenshots: TODO, capture the widget cards.

## Submission notes

- Category is set to "Analytics and Data" (from the public directory categories); confirm the exact option in the submission dropdown.
