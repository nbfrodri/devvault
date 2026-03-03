const fs = require("fs");
const path = require("path");

const seedDir = path.join(__dirname, "src/lib/seed");
const files = fs.readdirSync(seedDir).filter((f) => f.endsWith(".ts"));

for (const file of files) {
  const filePath = path.join(seedDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  const beforeLength = content.length;
  content = content.replace(/\\\\n/g, "\\n");

  if (content.length !== beforeLength) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
