const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'Maxim@yandex.ru',
        password: await bcrypt.hash("123", 10)
      },
      {
        email: 'Alexander@gmail.com',
        password:  await bcrypt.hash("123", 10)
      }, 
      {
        email: 'Rasul@mail.ru',
        password:  await bcrypt.hash("123", 10)
      }, 
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
