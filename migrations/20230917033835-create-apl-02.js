"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Apl02s", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jadwal_asesiskema_asesor: {
        type: Sequelize.INTEGER,
        references: {
          model: "jadwal_asesiskema_asesors",
          key: "id",
        },
        onDelete: "CASCADE",
        onDelete: "CASCADE",
      },
      id_apl01: {
        type: Sequelize.INTEGER,
        references: {
          model: "APL01s",
          key: "id",
        },
        onDelete: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Apl02s");
  },
};
