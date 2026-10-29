// Reads techbox-bundle.txt, creates every === FILE: path === entry.
// Usage: node scaffold.js techbox-bundle.txt
const fs = require("fs");
const path = require("path");

const bundlePath = process.argv[2];
if (!bundlePath) {
  console.error("Usage: node scaffold.js <bundle-file>");
  process.exit(1);
}

const text = fs.readFileSync(bundlePath, "utf8");
const lines = text.split(/\r?\n/);
const fileMarker = /^=== FILE: (.+?) ===$/;

let current = null;
let buffer = [];
let count = 0;

function flush() {
  if (!current) return;
  const full = buffer.join("\n").replace(/^\n+|\n+$/g, "");
  const dir = path.dirname(current);
  if (dir && dir !== ".") fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(current, full + "\n", "utf8");
  console.log("wrote", current);
  count++;
  current = null;
  buffer = [];
}

for (const line of lines) {
  const m = line.match(fileMarker);
  if (m) {
    flush();
    current = m[1];
  } else if (current) {
    buffer.push(line);
  }
}
flush();
console.log(`\nDone. ${count} files written.`);