
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for(let i = 0;i<10000;i++){
      users.push({
        name: `User ${i+1}`,
        email: `user${i+1}@gmail.com`,
        password:bcrypt.hashSync(`user${i+1}`,2),
        phoneNo:9857463748,
        createdAt: new Date(),
        updatedAt: new Date(),

      })
    }
    await queryInterface.bulkInsert('users', users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
