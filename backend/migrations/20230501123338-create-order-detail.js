'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      orderStatus: {
        type: Sequelize.ENUM("SHIPPED","CANCELLED","PENDING","REJECTED","PROCESSING","DELIVERED"),
        defaultValue : "PENDING"
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull : false
      },
      userMobileNo: {
        type: Sequelize.BIGINT,
        allowNull : false
      },
      shippingAddressLine1: {
        type: Sequelize.STRING,
        allowNull : false
      },
      shippingAddressLine2: {
        type: Sequelize.STRING,
        allowNull : true
      },
      shippingCountry: {
        type: Sequelize.STRING(100),
        allowNull : false
      },
      shippingState: {
        type: Sequelize.STRING(100),
      },
      shippingCity: {
        type: Sequelize.STRING(100),
      },
      shippingLandMark: {
        type: Sequelize.STRING(150)
      },
      shippingPincode: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDetails');
  }
};