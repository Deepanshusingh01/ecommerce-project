'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('carts','quantity',{
      type : Sequelize.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('carts','quantity')
  }
};
