"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "News",
      [
        {
          title: "В Алтайском крае спасли двух лебедей с поврежденными крыльями",
          content:'Двух лебедей с поврежденными крыльями спасли в Алтайском крае. Птиц заметили на замерзающем озере жители села Баево. Водоем покрылся тонким льдом и снегом, лебеди не могли плавать", - говорится в сообщении."'
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("News", null, {});
  },
};
