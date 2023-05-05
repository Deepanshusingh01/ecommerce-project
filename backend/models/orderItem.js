'use strict';

const {Model,DataTypes} = require('sequelize');
const sequelize = require("../config/db");

  class OrderItem extends Model {}

  OrderItem.init({
    productId: {
      type: DataTypes.INTEGER
    },
    productName : {
      type : DataTypes.STRING,
      allownull : false
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allownull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allownull : false
    },
    image :{
      type : DataTypes.STRING,
      allownull: true
    },
    orderId: {
      type: DataTypes.INTEGER
    },
  },{
    sequelize,
    modelName: 'orderItem',
  });

  module.exports = OrderItem