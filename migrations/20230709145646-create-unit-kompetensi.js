"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Unit_Kompetensis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode_unit: {
        type: Sequelize.STRING,
      },
      judul_unit: {
        type: Sequelize.STRING,
      },
      id_skema: {
        type: Sequelize.INTEGER,
        references: {
          model: "Skemas",
          key: "id",
        },
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
    await queryInterface.dropTable("Unit_Kompetensis");
  },
};
