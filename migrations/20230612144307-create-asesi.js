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
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      nik: {
        type: Sequelize.STRING,
      },
      provinsi: {
        type: Sequelize.INTEGER,
      },
      kota: {
        type: Sequelize.INTEGER,
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
      nama_pemilik_rekening: {
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
      jabatan: {
        type: Sequelize.STRING,
      },
      tlp_kantor: {
        type: Sequelize.STRING,
      },
      hp_kantor: {
        type: Sequelize.STRING,
      },
      fax: {
        type: Sequelize.STRING,
      },
      kodepos_kantor: {
        type: Sequelize.STRING,
      },
      transkrip: {
        type: Sequelize.STRING,
      },
      ijazah: {
        type: Sequelize.STRING,
      },
      bukti_bayar: {
        type: Sequelize.STRING,
      },
      img_ktp: {
        type: Sequelize.STRING,
      },
      pas_foto: {
        type: Sequelize.STRING,
      },
      surat_pernyataan: {
        type: Sequelize.STRING,
      },
      ttd_asesi: {
        type: Sequelize.STRING,
      },
      memiliki_nilai_D: {
        type: Sequelize.BOOLEAN,
      },
      sertifikat_pelatihan_pendukung: {
        type: Sequelize.STRING,
      },
      tujuan_asesmen: {
        type: Sequelize.STRING,
      },

      status_pembayaran: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      alasan_penolakan: {
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
    await queryInterface.dropTable("Asesis");
  },
};
