'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("orderdetails","stripeSessionId",{
      type : Sequelize.STRING,
      allownull : true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("orderdetails","stripeSessionId")
  }
};
