const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("product", {
  productId: {
    type: Sequelize.INTEGER,
    allownull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: Sequelize.STRING(50),
    allownull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allownull: false,
  },
  description: {
    type: Sequelize.STRING,
    allownull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allownull: false,
  },
  image: {
    type: Sequelize.STRING,
    allownull: true,
  },
});

module.exports = Product
