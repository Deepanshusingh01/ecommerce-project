'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products','image',{
      type : Sequelize.STRING,
      allownull : true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products','image')
  }
};
