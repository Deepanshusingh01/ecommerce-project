'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('order_details','stripeSessionId',{
      type : Sequelize.STRING,
      allowNull : true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('order_details','stripeSessionId')
  }
};
