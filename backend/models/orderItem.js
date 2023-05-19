'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class OrderItem extends Model {}

OrderItem.init(
  {
    productId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    orderId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'order_Item',
  }
);

module.exports = OrderItem;
