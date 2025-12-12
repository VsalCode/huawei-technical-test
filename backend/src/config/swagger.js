const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employees Management API",
      version: "1.0.0",
      description: "Dokumentasi API Employees Management untuk Huawei Technical Test",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "../routers/*.js")],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
