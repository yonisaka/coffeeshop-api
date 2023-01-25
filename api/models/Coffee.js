const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const tableName = "coffees";

const Coffee = sequelize.define(
  "Coffee",
  {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },
  { tableName }
);

Coffee.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Coffee;
