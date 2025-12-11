require("dotenv").config({ path: "../.env" }); 
const fs = require('fs');
const path = require('path');

const dir = process.env.CORN_DIR

function cleanOldFiles() {
  const files = fs.readdirSync(dir);
  const now = Date.now();

  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);

    const age = now - stats.mtimeMs;
    const oneMonth = 30 * 24 * 60 * 60 * 1000; 

    if (age > oneMonth) {
      fs.unlinkSync(filepath);
      console.log(`Deleted old file: ${filepath}`);
    }
  });
}

cleanOldFiles();