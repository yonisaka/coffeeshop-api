const Sequelize = require("sequelize");
const connection = require("./connection");

let database = new Sequelize(
  connection.development.database,
  connection.development.username,
  connection.development.password,
  {
    host: connection.development.host,
    dialect: connection.development.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

module.exports = database;
