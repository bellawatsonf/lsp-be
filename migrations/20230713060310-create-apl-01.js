"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("APL01s", {
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
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: "Admins",
          key: "id",
        },
      },
      rekomendasi_sebagai_asesi: {
        type: Sequelize.BOOLEAN,
      },
      id_kriteria_unitkerja: {
        type: Sequelize.INTEGER,
        references: {
          model: "Kriteria_UnitKerjas",
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
    await queryInterface.dropTable("APL01s");
  },
};
