const express = require("express");
const routers = require("./src/routers/index.router");

const app = express();

app.use(express.json());
app.use("/", routers);

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
