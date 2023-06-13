"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Asesis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_asesi: {
        type: Sequelize.INTEGER,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      tempat_lahir: {
        type: Sequelize.STRING,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
      },
      kebangsaan: {
        type: Sequelize.STRING,
      },
      alamat_rumah: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      kodepos: {
        type: Sequelize.STRING,
      },
      email_kantor: {
        type: Sequelize.STRING,
      },
      alamat_kantor: {
        type: Sequelize.STRING,
      },
      telp: {
        type: Sequelize.STRING,
      },
      kualifikasi_pendidikan: {
        type: Sequelize.STRING,
      },
      nama_instansi: {
        type: Sequelize.STRING,
      },
      tlp_kantor: {
        type: Sequelize.STRING,
      },
      fax: {
        type: Sequelize.STRING,
      },
      kodepos_kantor: {
        type: Sequelize.STRING,
      },
      transkrip: {
        type: Sequelize.BLOB,
      },
      ijazah: {
        type: Sequelize.BLOB,
      },
      bukti_bayar: {
        type: Sequelize.BLOB,
      },
      img_ktp: {
        type: Sequelize.STRING,
      },
      pas_foto: {
        type: Sequelize.BLOB,
      },
      surat_pernyataan: {
        type: Sequelize.BLOB,
      },
      ttd_asesi: {
        type: Sequelize.BLOB,
      },
      memiliki_nilai_D: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Asesis");
  },
};
