'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("products",'rating',{
      type : Sequelize.INTEGER,
      allownull : false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("products","rating")
  }
};
