'use strict';
const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/db")

  class OrderDetail extends Model {}
  OrderDetail.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    stripeSessionId : {
      type : DataTypes.STRING,
      allownull : true
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    orderStatus: {
      type: DataTypes.ENUM("SHIPPED","CANCELLED","PENDING","REJECTED","PROCESSING","DELIVERED","FAILED"),
      defaultValue : "PENDING"
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull : false
    },
    userMobileNo: {
      type: DataTypes.BIGINT,
      allowNull : false
    },
    shippingAddressLine1: {
      type: DataTypes.STRING,
      allowNull : true
    },
    shippingAddressLine2: {
      type: DataTypes.STRING,
      allowNull : true
    },
    shippingCountry: {
      type: DataTypes.STRING(100),
      allowNull : true
    },
    shippingState: {
      type: DataTypes.STRING(100),
    },
    shippingCity: {
      type: DataTypes.STRING(100),
    },
    shippingLandMark: {
      type: DataTypes.STRING(150)
    },
    shippingPincode: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });

  module.exports = OrderDetail