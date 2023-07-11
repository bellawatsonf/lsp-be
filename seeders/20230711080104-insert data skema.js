"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Skemas",
      [
        // {
        //   no_skema: "dddsds22",
        //   nama_skema:
        //     "Teknisi Perpajakan Pph Badan Sektor Usaha Jasa Dan Perdagangan",
        // createdAt: new Date(),
        // updatedAt: new Date()
        // },
        {
          no_skema: "dddsds22",
          nama_skema: "Pengelolaan Sistem Pergudangan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema:
            "PKKNI Level V Pada Kompetensi Keahlian Kewirausahaan Industri",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Penyelia Ekspor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Asisten Produser Produksi Program Televisi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Analis Kebijakan Publik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Manager Logistik Proyek",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Public Relations Coordinator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Front Office Supervisor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          no_skema: "dddsds22",
          nama_skema: "Media Planning Manajer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skemas", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
