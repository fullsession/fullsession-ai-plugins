// Builds an installable plugin package from shared/ + <platform>/ into dist/.
//
//   node build.mjs                          production package (fails on TODOs with --strict)
//   node build.mjs --mcp-url <url>/mcp      test package pointing at another MCP server (e.g. ngrok)
//   node build.mjs --strict                 refuse to build while any TODO( remains
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = name => { const i = args.indexOf(name); return i === -1 ? undefined : args[i + 1]; };
const platform = opt("--platform") ?? "openai";
const mcpUrl = opt("--mcp-url");
const strict = args.includes("--strict");

const ROOT = resolve(".");
const SRC = join(ROOT, platform);
if (!existsSync(join(SRC, "plugin.json"))) throw new Error(`No ${platform}/plugin.json`);

const errors = [], todos = [];
const plugin = JSON.parse(readFileSync(join(SRC, "plugin.json"), "utf8"));
const mcp = JSON.parse(readFileSync(join(SRC, "mcp.json"), "utf8"));
const openai = plugin.extensions?.["com.openai"] ?? {};
const ui = openai.interface ?? {};

if (mcpUrl) {
  for (const server of Object.values(mcp.mcpServers)) server.url = mcpUrl;
  plugin.name = `${plugin.name}-local`;
  ui.displayName = `${ui.displayName} Local`.slice(0, 30);
}

// Limits from the OpenAI plugin spec.
const limits = { displayName: 30, shortDescription: 30, longDescription: 4000, developerName: 80 };
for (const [k, max] of Object.entries(limits)) {
  if (!ui[k]) errors.push(`interface.${k} is required`);
  else if (ui[k].length > max) errors.push(`interface.${k} is ${ui[k].length} chars (max ${max})`);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(plugin.name) || plugin.name.length > 64) errors.push(`name "${plugin.name}" must be lowercase-hyphenated, <= 64 chars`);
for (const c of ui.capabilities ?? []) if (c.length > 120) errors.push(`capability over 120 chars: ${c}`);
for (const p of [].concat(ui.defaultPrompt ?? [])) if (p.length > 128) errors.push(`starter prompt over 128 chars: ${p}`);
const tests = openai.review?.test_cases ?? {};
if ((tests.positive ?? []).length !== 5) errors.push(`need exactly 5 positive test cases (have ${(tests.positive ?? []).length})`);
if ((tests.negative ?? []).length !== 3) errors.push(`need exactly 3 negative test cases (have ${(tests.negative ?? []).length})`);

// Skills: every folder needs a SKILL.md with name + description frontmatter.
const skillsDir = join(ROOT, "shared", "skills");
for (const s of readdirSync(skillsDir).filter(d => existsSync(join(skillsDir, d, "SKILL.md")))) {
  const head = readFileSync(join(skillsDir, s, "SKILL.md"), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  if (!/^name:\s*\S/m.test(head) || !/^description:\s*\S/m.test(head)) errors.push(`skills/${s}/SKILL.md needs name and description frontmatter`);
}

// Images referenced by the manifest must exist in shared/assets.
const assetRefs = [ui.composerIcon, ui.composerIconDark, ui.logo, ui.logoDark, ...(ui.screenshots ?? [])].filter(Boolean);
for (const ref of assetRefs) if (!existsSync(join(ROOT, "shared", ref.replace(/^\.\//, "")))) errors.push(`missing image ${ref}`);

// TODO markers left for humans (listing copy, reviewer data, demo video…).
JSON.stringify(plugin, (k, v) => { if (typeof v === "string" && v.includes("TODO(")) todos.push(`${k}: ${v.match(/TODO\([^)]*\)/)[0]}`); return v; });

if (errors.length) { console.error("Build failed:\n  " + errors.join("\n  ")); process.exit(1); }
if (todos.length) {
  console.warn(`${todos.length} TODO(s) left:\n  ` + [...new Set(todos)].join("\n  "));
  if (strict) { console.error("--strict: not building with TODOs."); process.exit(1); }
}

// Assemble.
const outName = `${plugin.name}-${platform}-${plugin.version}`;
const OUT = join(ROOT, "dist", outName);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "assets"), { recursive: true });
cpSync(skillsDir, join(OUT, "skills"), { recursive: true, filter: p => !p.endsWith(".gitkeep") });
for (const ref of new Set(assetRefs)) cpSync(join(ROOT, "shared", ref.replace(/^\.\//, "")), join(OUT, ref.replace(/^\.\//, "")));
writeFileSync(join(OUT, "plugin.json"), JSON.stringify(plugin, null, 2) + "\n");
writeFileSync(join(OUT, "mcp.json"), JSON.stringify(mcp, null, 2) + "\n");

const zip = join(ROOT, "dist", `${outName}.zip`);
rmSync(zip, { force: true });
execFileSync("zip", ["-qr", zip, "."], { cwd: OUT });
console.log(`Built ${zip}${mcpUrl ? `  (MCP: ${mcpUrl})` : ""}`);
