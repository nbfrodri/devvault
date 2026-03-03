const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "src/lib/seed/dataDisplay.ts");
let c = fs.readFileSync(p, "utf8");
console.log("BEFORE: ", c.substring(0, 300));
c = c.replace(/\\\\n/g, "\\n");
console.log("AFTER: ", c.substring(0, 300));
