const express = require("express");
const router = express.Router();

const employeeRouter = require("./employee.router");

router.use("/employees", employeeRouter);

module.exports = router;
