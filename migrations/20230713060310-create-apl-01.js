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
      // id_asesi: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "Asesis",
      //     key: "id",
      //   },
      // },
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
      id_asesi_skema: {
        type: Sequelize.INTEGER,
        references: {
          model: "asesi_skemas",
          key: "id",
        },
      },
      id_asesi: {
        type: Sequelize.INTEGER,
      },
      status_ujikom: {
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
    await queryInterface.dropTable("APL01s");
  },
};
