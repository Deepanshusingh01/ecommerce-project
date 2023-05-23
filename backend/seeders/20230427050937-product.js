'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('products',[
    {
      createdBy: 3,
      productName : 'M1 A4',
      description : 'This is an new phone of mi series',
      price : 15000,
      image:'file-1682601688141.jpg',
      createdAt : new Date(),
      updatedAt : new Date()
   },
   {
    createdBy: 3,
    productName : 'apple',
    description : 'This belongs to phone',
    price : 250000,
    createdAt : new Date(),
    updatedAt : new Date()
 },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products',null,{})
  }
};
