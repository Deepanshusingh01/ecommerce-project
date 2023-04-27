'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("products",[
    {
      productName : "M1 A4",
      description : "This is an new phone of mi series",
      price : 15000,
      rating : 4 ,
      createdAt : new Date(),
      updatedAt : new Date()
   },
   {
    productName : "apple",
    description : "This belongs to phone",
    price : 250000,
    rating : 5,
    createdAt : new Date(),
    updatedAt : new Date()
 },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products",null,{})
  }
};