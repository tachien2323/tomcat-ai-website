/* One-off build script: converts the data extracted from the reference site
   into src/data/khoRepoCatalog.json (topics + repos). */
const fs = require("fs");
const path = require("path");

const DIR =
  "/Users/tachien/.gemini/antigravity/brain/89ed0494-f25c-42a4-a869-310ab8b3b146/browser_sandbox/outputs";
const OUT = path.join(__dirname, "..", "src", "data", "khoRepoCatalog.json");

const readVal = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")).value;

const GROUP_MAP = {
  agent: "AI & LLM", coding: "AI & LLM", skills: "AI & LLM", memory: "AI & LLM",
  platform: "AI & LLM", llm: "AI & LLM", genmedia: "AI & LLM", genvideo: "AI & LLM",
  doc: "AI & LLM", learnai: "AI & LLM",
  scrape: "DỮ LIỆU & WEB", api: "DỮ LIỆU & WEB",
  lang: "LẬP TRÌNH", backend: "LẬP TRÌNH", frontend: "LẬP TRÌNH", ui: "LẬP TRÌNH",
  graphics: "LẬP TRÌNH", editor: "LẬP TRÌNH", appdev: "LẬP TRÌNH",
  devops: "HẠ TẦNG & BẢO MẬT", monitor: "HẠ TẦNG & BẢO MẬT", selfhost: "HẠ TẦNG & BẢO MẬT",
  security: "HẠ TẦNG & BẢO MẬT", finance: "HẠ TẦNG & BẢO MẬT",
  sysutil: "ỨNG DỤNG", media: "ỨNG DỤNG", productivity: "ỨNG DỤNG",
  learn: "HỌC TẬP", algo: "HỌC TẬP", awesome: "HỌC TẬP", bestpractice: "HỌC TẬP", other: "HỌC TẬP",
};

// --- language map (slug -> language) for pages whose language column was extracted separately
const langMap = new Map();
for (const f of ["step_56.json", "step_58.json"]) {
  const v = readVal(f);
  for (const pg of v.langPages || []) {
    for (const [slug, lang] of pg.rows) langMap.set(slug, lang);
  }
}

// --- topics
const topicsRaw = [];
for (const f of ["step_14.json", "step_18.json", "step_22.json"]) {
  topicsRaw.push(...(readVal(f).topicsData || []));
}
const topics = topicsRaw.map((t) => {
  const slug = new URL(t.url).searchParams.get("chu-de") || "";
  const m = (t.matchCount || "").match(/(\d[\d.]*)/);
  return {
    slug,
    name: t.h2,
    blurb: t.blurb,
    count: m ? parseInt(m[1].replace(/\./g, ""), 10) : 0,
    group: GROUP_MAP[slug] || "HỌC TẬP",
  };
});
const topicNameToSlug = new Map(topics.map((t) => [t.name, t.slug]));

function parseStars(str) {
  if (!str) return 0;
  const s = String(str).trim().toUpperCase();
  if (s.endsWith("K")) return Math.round(parseFloat(s.slice(0, -1)) * 1000);
  if (s.endsWith("M")) return Math.round(parseFloat(s.slice(0, -1)) * 1000000);
  return parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
}

// --- repos from all page dumps
const files = [
  "step_29.json", "step_35.json", "step_37.json", "step_39.json",
  "step_41.json", "step_43.json", "step_50.json", "step_52.json",
];
const repos = [];
const seen = new Set();

for (const f of files) {
  const v = readVal(f);
  for (const pd of v.pagesData || []) {
    for (const row of pd.repos || []) {
      let fullName = row[0];
      let topicName, stars, lang, desc, slug;
      if (f === "step_50.json") {
        const combined = row[1] || "";
        const m = combined.match(/^(.*?)\s*([\d.,]+\s*[KM]?)$/i);
        topicName = m ? m[1].trim() : combined;
        stars = m ? m[2].replace(/\s/g, "") : "0";
        desc = row[4] || "";
        slug = row[5];
        lang = langMap.get(slug) || row[3] || "Khác";
      } else {
        topicName = row[1];
        stars = row[2];
        desc = row[4] || "";
        slug = row[5];
        lang = row[3] || langMap.get(slug) || "Khác";
      }
      if (!slug) slug = fullName.toLowerCase().replace(/\//g, "-");
      if (seen.has(slug)) continue;
      seen.add(slug);
      const [owner, ...rest] = fullName.split("/");
      repos.push({
        slug,
        fullName,
        owner,
        name: rest.join("/") || owner,
        topic: topicName,
        topicSlug: topicNameToSlug.get(topicName) || "other",
        stars,
        starsNum: parseStars(stars),
        language: lang || "Khác",
        description: desc,
      });
    }
  }
}

// --- "Mới thêm" ordering from the newest-24 dump
const newest = readVal("step_26.json").newest24 || [];
newest.forEach((n, idx) => {
  const slug = (n.u || "").replace("/kho-repo/", "");
  let found = repos.find((r) => r.slug === slug);
  if (!found) {
    // repo not present in the star-sorted dump -> add it from the newest list
    const [owner, ...rest] = n.r.split("/");
    found = {
      slug: slug || n.r.toLowerCase().replace(/\//g, "-"),
      fullName: n.r,
      owner,
      name: rest.join("/") || owner,
      topic: n.c,
      topicSlug: topicNameToSlug.get(n.c) || "other",
      stars: n.s,
      starsNum: parseStars(n.s),
      language: n.l || "Khác",
      description: n.d || "",
    };
    repos.push(found);
  }
  found.newestRank = idx + 1;
});

// recompute topic counts from real data
const counts = {};
for (const r of repos) counts[r.topicSlug] = (counts[r.topicSlug] || 0) + 1;
topics.forEach((t) => (t.count = counts[t.slug] || 0));

fs.writeFileSync(OUT, JSON.stringify({ topics, repos }));
console.log("repos:", repos.length, "topics:", topics.length, "newest:", repos.filter((r) => r.newestRank).length);
const missing = topics.filter((t) => !t.count).map((t) => t.slug);
console.log("topics without repos:", missing);
console.log("languages:", [...new Set(repos.map((r) => r.language))].length);
