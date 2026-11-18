/* One-off build script: converts the AI Templates data extracted from the reference site
   into src/data/skillsCatalog.json (types + items + trending + jobs). */
const fs = require("fs");
const path = require("path");

const DIR =
  "/Users/tachien/.gemini/antigravity/brain/26c6d21e-9dc7-4305-af92-bdd6c717317b/browser_sandbox/outputs";
const OUT = path.join(__dirname, "..", "src", "data", "skillsCatalog.json");

const TYPE_DEFS = [
  { id: "Skills", singular: "Skill", slug: "skills", flag: "--skill", ghMode: "tree" },
  { id: "Agents", singular: "Agent", slug: "agents", flag: "--agent", ghMode: "blob-md" },
  { id: "Commands", singular: "Command", slug: "commands", flag: "--command", ghMode: "blob-md" },
  { id: "MCPs", singular: "MCP", slug: "mcps", flag: "--mcp", ghMode: "blob-json" },
  { id: "Plugins", singular: "Plugin", slug: "plugins", flag: "--plugin", ghMode: "tree" },
  { id: "Hooks", singular: "Hook", slug: "hooks", flag: "--hook", ghMode: "blob-json" },
  { id: "Settings", singular: "Setting", slug: "settings", flag: "--setting", ghMode: "blob-json" },
  { id: "Loops", singular: "Loop", slug: "loops", flag: "--loop", ghMode: "tree" },
  { id: "Mods", singular: "Mod", slug: "mods", flag: "--mod", ghMode: "tree" },
  { id: "Sandbox", singular: "Sandbox", slug: "sandbox", flag: "--sandbox", ghMode: "tree" },
  { id: "Templates", singular: "Template", slug: "templates", flag: "--template", ghMode: "tree" },
];

const SINGULAR_TO_TYPE = new Map(TYPE_DEFS.map((t) => [t.singular.toLowerCase(), t]));

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDownloads(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^\d]/g, ""), 10) || 0;
}

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

const items = [];
const seen = new Set();

for (const f of files) {
  const num = parseInt(f.match(/\d+/)[0], 10);
  if (num < 60 || num > 210) continue;
  const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  const v = d.value;
  if (!v) continue;

  const collect = (arr) => {
    if (!Array.isArray(arr)) return;
    for (const entry of arr) {
      if (Array.isArray(entry) && entry.length >= 6 && typeof entry[0] === "string") {
        const [name, category, downloads, description, source, typeSingular] = entry;
        const typeDef = SINGULAR_TO_TYPE.get(String(typeSingular || "").toLowerCase());
        if (!typeDef) continue;

        const key = `${typeDef.id}|${category}|${name}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const catSlug = slugify(category) || "general";
        const item = {
          id: `${typeDef.slug}__${catSlug}__${name}`,
          name: String(name).trim(),
          type: typeDef.id,
          typeSingular: typeDef.singular,
          category: String(category || "General").trim(),
          downloads: String(downloads || "0").trim(),
          downloadsNum: parseDownloads(downloads),
          description: String(description || "").trim(),
        };
        if (source && String(source).trim()) {
          item.source = String(source).trim();
        }
        items.push(item);
      } else if (Array.isArray(entry)) {
        collect(entry);
      } else if (entry && typeof entry === "object") {
        for (const k of Object.keys(entry)) {
          if (Array.isArray(entry[k])) collect(entry[k]);
        }
      }
    }
  };

  collect(Array.isArray(v) ? v : Object.values(v));
}

// Recompute exact counts & categories per type
const types = TYPE_DEFS.map((t) => {
  const typeItems = items.filter((i) => i.type === t.id);
  const categories = [...new Set(typeItems.map((i) => i.category))].sort((a, b) =>
    a.localeCompare(b)
  );
  return {
    id: t.id,
    singular: t.singular,
    slug: t.slug,
    flag: t.flag,
    ghMode: t.ghMode,
    count: typeItems.length,
    categories,
  };
});

// Community Picks ("Đang được quan tâm") matching reference site
const TRENDING_RAW = [
  { rank: "01", name: "frontend-design", category: "Creative Design", weeklyCount: "755" },
  { rank: "02", name: "senior-frontend", category: "Development", weeklyCount: "635" },
  { rank: "03", name: "ui-ux-pro-max", category: "Creative Design", weeklyCount: "545" },
  { rank: "04", name: "react-best-practices", category: "Web Development", weeklyCount: "373" },
  { rank: "05", name: "frontend-developer", category: "Development Team", weeklyCount: "367" },
  { rank: "06", name: "code-reviewer", category: "Development", weeklyCount: "343" },
];

const trending = TRENDING_RAW.map((tr) => {
  const match =
    items.find(
      (i) =>
        i.name === tr.name &&
        i.category.toLowerCase() === tr.category.toLowerCase()
    ) || items.find((i) => i.name === tr.name);
  return {
    ...tr,
    itemId: match ? match.id : null,
    type: match ? match.type : "Skills",
  };
});

// Claude Ecosystem Jobs ("Cơ hội nghề nghiệp") matching reference site
const jobs = [
  {
    id: "job-5397654008",
    badge: "A",
    title: "Product Designer, Claude Developer Platform",
    company: "Anthropic",
    location: "San Francisco, CA | New York City, NY | Seattle, WA",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5397654008",
  },
  {
    id: "job-5428014008",
    badge: "A",
    title: "Product Designer, Safeguards",
    company: "Anthropic",
    location: "San Francisco, CA | New York City, NY | Seattle, WA",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5428014008",
  },
  {
    id: "job-5382518008",
    badge: "A",
    title: "Applied AI Architect, Public Sector",
    company: "Anthropic",
    location: "Washington, DC",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5382518008",
  },
  {
    id: "job-5428790008",
    badge: "A",
    title: "GTM Enablement Trainer, Claude Products",
    company: "Anthropic",
    location: "San Francisco, CA | New York City, NY",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5428790008",
  },
  {
    id: "job-5057647008",
    badge: "A",
    title: "Applied AI Engineer, Enterprise",
    company: "Anthropic",
    location: "San Francisco, CA | New York City, NY",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5057647008",
  },
  {
    id: "job-5432575008",
    badge: "A",
    title: "Applied AI Engineer, Startups",
    company: "Anthropic",
    location: "London, UK",
    url: "https://job-boards.greenhouse.io/anthropic/jobs/5432575008",
  },
];

const allJobsUrl = "https://job-boards.greenhouse.io/anthropic";

fs.writeFileSync(OUT, JSON.stringify({ types, items, trending, jobs, allJobsUrl }));

console.log("Total items:", items.length);
console.log(
  "Per type:",
  types.map((t) => `${t.id}=${t.count}(${t.categories.length} cats)`).join(", ")
);
console.log("Trending matched:", trending.filter((t) => t.itemId).length, "/", trending.length);
console.log("Output size:", (fs.statSync(OUT).size / 1024).toFixed(1), "KB");
