'use strict';
const {Model,DataTypes} = require('sequelize');
const sequelize = require("../config/db");

  class OrderItem extends Model {}

  OrderItem.init({
    orderId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    productPrice: {
      type: DataTypes.FLOAT
    },
    Quantity: {
      type: DataTypes.FLOAT
    },
  },{
    sequelize,
    modelName: 'orderItem',
  });

  module.exports = OrderItem