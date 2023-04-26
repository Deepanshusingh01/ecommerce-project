'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable("users",{
      userId : {
          type : Sequelize.INTEGER,
          allownull : false,
          primaryKey : true,
          autoIncrement : true
      },
      name : {
          type : Sequelize.STRING(20),
          allownull : false
      },
      email : {
          type : Sequelize.STRING(50),
          allownull : false,
          unique : true
      },
      phoneNo : {
        type : Sequelize.BIGINT,
        allownull:false
      },
      password : {
          type : Sequelize.STRING,
          allownull : false
      },
      createdAt : {
          type : Sequelize.DATE,
          allownull : false,
          defaultValue : Sequelize.NOW
      },
      updatedAt : {
        type : Sequelize.DATE,
        allownull : false
      }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users")
  }
};
