"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jadwals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_jadwal: {
        type: Sequelize.STRING,
      },
      tuk: {
        type: Sequelize.STRING,
      },
      tgl: {
        type: Sequelize.DATE,
      },
      status_jadwal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tipe: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jadwals");
  },
};
