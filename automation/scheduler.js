const cron = require("node-cron");
const { exec } = require("child_process");

console.log("Scheduler is running...");

// Collect 08:00, 12:00, 15:00 WIB
cron.schedule("0 8,12,15 * * *", () => {
  console.log("Running collect data...");
  exec("node collect.js");
});

// Clean file tiap 00:00
cron.schedule("0 0 * * *", () => {
  console.log("Running clean old files...");
  exec("node clean.js");
});
