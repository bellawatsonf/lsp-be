"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Skemas", [
      {
        nama_skema: "Pengelolaan Sistem Pergudangan",
        no_skema: "false",

        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema:
          "KKNI Level V Pada Kompetensi Keahlian Kewirausahaan Industri",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Penyelia Ekspor",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Asisten Produser Produksi Program Televisi",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Analisis Kebijakan Public",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema:
          "Teknisi Perpajakan PPh Badan Sektor Usaha Jasa Dan Perdagangan",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nama_skema: "Manager Logistik Proyek",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Public Relation Coordinator",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Front Office Supervisor",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_skema: "Media Planning Manager",
        no_skema: "false",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
