const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "./database/dev.sqlite",
  dialect: "sqlite",
});

module.exports = sequelize;
