"use-strict";

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const moment = require("moment");

class Reset extends Model {}

Reset.init(
  {
    resetId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      defaultValue: moment().add(4, "minutes").toDate(),
    },
  },
  {
    sequelize,
  }
);

module.exports = Reset;
