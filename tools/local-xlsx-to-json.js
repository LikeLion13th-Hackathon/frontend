// tools/beopjeong-xlsx-to-json.js
const fs = require("fs");
const XLSX = require("xlsx");

const input = process.argv[2]; // 엑셀 파일 경로
const output = process.argv[3] || "seoul_incheon.json"; // 출력 파일 경로

if (!input) {
  console.error(
    "Usage: node tools/beopjeong-xlsx-to-json.js <input.xlsx> [output.json]"
  );
  process.exit(1);
}

const wb = XLSX.readFile(input, { cellDates: false });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

const sidoSet = new Set(["서울특별시", "인천광역시"]);
const tree = {};
const norm = (s) => String(s ?? "").trim();

for (const r of rows) {
  const full = norm(r["법정동명"]);
  if (!full) continue;

  const parts = full.split(/\s+/);
  if (parts.length < 3) continue; // 시/도 + 시/군/구만 있는 행 제외

  const sido = parts[0];
  if (!sidoSet.has(sido)) continue;

  const sigungu = parts[1];
  const dong = parts.slice(2).join(" ").trim();

  tree[sido] ??= {};
  tree[sido][sigungu] ??= [];
  if (dong && !tree[sido][sigungu].includes(dong)) {
    tree[sido][sigungu].push(dong);
  }
}

// 정렬
for (const s of Object.keys(tree)) {
  for (const g of Object.keys(tree[s])) {
    tree[s][g].sort((a, b) => a.localeCompare(b, "ko"));
  }
}

fs.writeFileSync(output, JSON.stringify(tree, null, 2), "utf8");
console.log("✅ JSON 저장 완료:", output);
