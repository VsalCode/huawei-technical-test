const fs = require('fs');
const path = require('path');

const DIR="C:\\faisal\\huawei-tech-test\\automation\\cron"

function cleanOldFiles() {
  const files = fs.readdirSync(DIR);
  const now = Date.now();

  files.forEach(file => {
    const filepath = path.join(DIR, file);
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