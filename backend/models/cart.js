const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('cart', {
  cartId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cart;
