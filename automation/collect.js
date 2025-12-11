require("dotenv").config({ path: "../.env" }); 
const fs = require('fs');
const path = require('path');

const dir = process.env.CORN_DIR

function collectData() {
  // contoh data dummy, bisa diganti dengan fetch API atau database query
  return [
    ["id", "name", "value"],
    [1, "alpha", Math.random()],
    [2, "beta", Math.random()],
    [3, "gamma", Math.random()]
  ];
}

function saveData() {
  const now = new Date();

  const date = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${now.getFullYear()}`;
  const hours = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

  const filename = `cron_${date}_${hours}.csv`;
  const filepath = path.join(dir, filename);

  const data = collectData().map(row => row.join(",")).join("\n");

  fs.writeFileSync(filepath, data);
  console.log(`Data collected and saved to ${filepath}`);
}

saveData();