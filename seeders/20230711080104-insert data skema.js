"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Skemas", [
      {
        no_skema: "dddsds22",
        nama_skema:
          "Teknisi Perpajakan Pph Badan Sektor Usaha Jasa Dan Perdagangan",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Pengelolaan Sistem Pergudangan",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema:
          "PKKNI Level V Pada Kompetensi Keahlian Kewirausahaan Industri",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Penyelia Ekspor",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Asisten Produser Produksi Program Televisi",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Analis Kebijakan Publik",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Manager Logistik Proyek",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Public Relations Coordinator",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Front Office Supervisor",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_skema: "dddsds22",
        nama_skema: "Media Planning Manajer",
        kuota: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
