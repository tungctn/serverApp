const express = require("express");
const appRoute = express();

const wordRoute = require("./word");

appRoute.use("/word", wordRoute);

module.exports = appRoute;