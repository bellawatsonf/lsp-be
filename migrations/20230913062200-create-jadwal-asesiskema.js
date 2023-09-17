"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jadwal_asesiskemas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_skema: {
        type: Sequelize.INTEGER,
        references: {
          model: "Skemas",
          key: "id",
        },
      },
      id_jadwal: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jadwals",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_asesis: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        // references: {
        //   model: "Asesis",
        //   key: "id",
        // },
      },
      nama_asesis: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        // references: {
        //   model: "Asesis",
        //   key: "id",
        // },
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
    await queryInterface.dropTable("jadwal_asesiskemas");
  },
};
