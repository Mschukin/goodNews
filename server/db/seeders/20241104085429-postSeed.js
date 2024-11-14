
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Dune',
        description: 'bla bla',
        url: '',
        image: '',
        user_id: 2,
      },
      {
        title: 'LOTR',
        description: 'bla bla',
        url: '',
        image: '',
        user_id: 1,
      },
      {
        title: 'Harry Potter',
        description: 'bla bla',
        url: '',
        image: '',
        user_id: 1,
      }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
