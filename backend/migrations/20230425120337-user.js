'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('users',{
      userId : {
          type : Sequelize.INTEGER,
          allowNull : false,
          primaryKey : true,
          autoIncrement : true
      },
      name : {
          type : Sequelize.STRING(20),
          allowNull : false
      },
      email : {
          type : Sequelize.STRING(50),
          allowNull : false,
          unique : true
      },
      phoneNo : {
        type : Sequelize.BIGINT,
        allowNull:false
      },
      password : {
          type : Sequelize.STRING,
          allowNull : false
      },
      createdAt : {
          type : Sequelize.DATE,
          allowNull : false,
          defaultValue : Sequelize.NOW
      },
      updatedAt : {
        type : Sequelize.DATE,
        allowNull : false
      }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
