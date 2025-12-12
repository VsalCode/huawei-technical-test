const express = require("express");
const routers = require("./src/routers/index.router");
require("dotenv").config({ path: "../.env" });
const swaggerSpec = require("./src/config/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/", routers);

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
