"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("asesi_skemas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_asesi: {
        type: Sequelize.INTEGER,
        references: {
          model: "Asesis",
          key: "id",
        },
      },
      id_skema: {
        type: Sequelize.INTEGER,
        references: {
          model: "Skemas",
          key: "id",
        },
      },
      jenis_paket: {
        type: Sequelize.STRING,
      },
      status_cek: {
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
    await queryInterface.dropTable("asesi_skemas");
  },
};
