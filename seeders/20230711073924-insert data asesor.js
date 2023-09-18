"use strict";

const { encrypt } = require("../middleware/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Asesors", [
      {
        nama: "Euis Komalawati",
        no_reg: "MET.000.001946 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_euis"),
        id_skema: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Citra Agnestia",
        no_reg: "MET.000.001947 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_citra"),
        id_skema: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Poppie Indriyanti",
        no_reg: "MET.000.001948 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_poppie"),
        id_skema: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Nadiah Abidin",
        no_reg: "MET.000.000061 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_nadiah"),
        id_skema: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Ovi Olivia Belida",
        no_reg: "MET.000.000062 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_ovi"),
        id_skema: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Saktisyahputra",
        no_reg: "MET.000.000063 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_sakti"),
        id_skema: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Heni Pridia RS",
        no_reg: "MET.000.000064 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_heni"),
        id_skema: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Rustini",
        no_reg: "MET.000.000065 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_rustini"),
        id_skema: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nama: "Degdo Suprayitno",
        no_reg: "MET.000.000067 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_degdo"),
        id_skema: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Sukarni Novita Sari",
        no_reg: "MET.000.000068 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_sukarni"),
        id_skema: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Yusup Rachmat Hidayat",
        no_reg: "MET.000.001945 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_yusup"),
        id_skema: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Dedy Kusna Utama",
        no_reg: "MET.000.000069 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_dedy"),
        id_skema: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Raden Kusyeni",
        no_reg: "MET.000.000070 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_raden"),
        id_skema: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Dwikora Harjo",
        no_reg: "MET.000.000071 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_dwikora"),
        id_skema: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Roike Tambengi",
        no_reg: "MET.000.001951 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_roike"),
        id_skema: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Rahadi Pratomo Singgih",
        no_reg: "MET.000.001953 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_rahadi"),
        id_skema: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Notika Rahmi",
        no_reg: "MET.000.001954 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_notika"),
        id_skema: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Agus Subagiyo",
        no_reg: "MET.000.000072 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_agus"),
        id_skema: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nama: "Teguh Santoso",
        no_reg: "MET.000.000073 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_teguh"),
        id_skema: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Widi Mulyadi",
        no_reg: "MET.000.001959 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_widi"),
        id_skema: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Juardi",
        no_reg: "MET.000.000074 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_juardi"),
        id_skema: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Achsanul Nashir",
        no_reg: "MET.000.001962 2019",
        email: "",
        role: "asesor",
        password: encrypt("asesor_achsanul"),
        id_skema: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Abdul Gofur",
        no_reg: "MET.000.000075 2023",
        email: "",
        role: "asesor",
        password: encrypt("asesor_abdul"),
        id_skema: 3,
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
    await queryInterface.bulkDelete("Asesors", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
