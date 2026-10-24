# FullSession AI plugins

Listing packages that bring FullSession into AI assistants: the **ChatGPT / Codex plugin** (OpenAI) and the **Claude plugin** (Anthropic).

A plugin contains no application code. It is a small package of static files (a manifest, skills and images) that points the assistant at FullSession's hosted MCP server:

- MCP server: `https://app.fullsession.io/mcp`

## Layout

```
fullsession/            the Claude plugin, committed as-is (Anthropic reads it from GitHub)
  .claude-plugin/plugin.json
  .mcp.json             → https://app.fullsession.io/mcp
  skills/<name>/SKILL.md  playbooks that teach the model how to use FullSession's tools (shared with OpenAI)
  README.md             Claude listing description + data disclosure
  LICENSE               MIT
openai/                 OpenAI manifest (plugin.json: listing, test cases) and mcp.json
shared/assets/          icons and logos (used by the OpenAI package)
build.mjs               validates and zips packages into dist/ (not committed)
```

The skills live once, in `fullsession/skills/`; the OpenAI build copies them from there.

## Platform formats

| | OpenAI (ChatGPT / Codex) | Anthropic (Claude) |
|---|---|---|
| Manifest | `plugin.json` (Codex: `.codex-plugin/plugin.json`) | `.claude-plugin/plugin.json` |
| MCP server | `mcp.json` (Codex: `.mcp.json`) | `.mcp.json` |
| Skills | `skills/<name>/SKILL.md` | `skills/<name>/SKILL.md` (folder name = skill `name`) |
| Listing text | in `plugin.json` | the plugin's `README.md` |
| Submitted at | platform.openai.com/plugins (ZIP upload) | claude.ai/directory/manage (this GitHub repo, folder `fullsession`; must be public before going live) |

## Build

Requires Node and `zip`.

```bash
node build.mjs                                   # OpenAI package → dist/fullsession-openai-<version>.zip
node build.mjs --platform claude                 # Claude package (zip of fullsession/) → dist/fullsession-claude-<version>.zip
node build.mjs [--platform claude] --mcp-url https://<ngrok>/mcp   # test package pointing at a local server
node build.mjs --strict                          # fail if any TODO( markers remain (use before submitting to OpenAI)
claude plugin validate ./fullsession             # Anthropic's local manifest/skill check
```

The build checks the OpenAI limits (name and description lengths, exactly 5 positive and 3 negative test cases), skill frontmatter and image paths, and lists remaining `TODO(...)` markers.

To try a package: ChatGPT → Plugins → Add → **Upload plugin archive**; claude.ai → Customize → Plugins → Add → **Upload plugin**; Claude Code → `claude --plugin-dir ./fullsession`.

## Assets

- `shared/assets/icon.png`, `icon-dark.png`: square app icon (512×512), used as both the listing logo and the composer icon. Rendered from `source/icon*.svg`.
- `shared/assets/source/wordmark*.png`, `logo-*.svg`: the full "fullsession" wordmark from fullsession.io. Not usable as the listing logo (must be square); kept for screenshots and docs.
- Screenshots: TODO, capture the widget cards.


