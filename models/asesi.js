"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asesi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asesi.belongsTo(models.role, { as: "Roles", foreignKey: "id_role" });
      Asesi.hasMany(models.APL01, { as: "Asesis", foreignKey: "id_asesi" });
    }
  }
  Asesi.init(
    {
      nama_lengkap: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tgl_lahir: DataTypes.DATE,
      jenis_kelamin: DataTypes.STRING,
      kebangsaan: DataTypes.STRING,
      alamat_rumah: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      kodepos: DataTypes.STRING,
      email_kantor: DataTypes.STRING,
      alamat_kantor: DataTypes.STRING,
      telp: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      kualifikasi_pendidikan: DataTypes.STRING,
      nama_instansi: DataTypes.STRING,
      tlp_kantor: DataTypes.STRING,
      hp_kantor: DataTypes.STRING,
      fax: DataTypes.STRING,
      kodepos_kantor: DataTypes.STRING,
      transkrip: DataTypes.STRING,
      ijazah: DataTypes.STRING,
      img_ktp: DataTypes.STRING,
      pas_foto: DataTypes.STRING,
      surat_pernyataan: DataTypes.STRING,
      bukti_bayar: DataTypes.STRING,
      ttd_asesi: DataTypes.STRING,
      sertifikat_pelatihan_pendukung: DataTypes.STRING,
      memiliki_nilai_D: DataTypes.BOOLEAN,
      tujuan_asesmen: DataTypes.STRING,
      alasan_penolakan: DataTypes.STRING,
      role: DataTypes.STRING,
      status_pembayaran: {
        type: DataTypes.STRING,
        defaultValue: "unpaid",
      },
    },
    {
      sequelize,
      modelName: "Asesi",
    }
  );
  return Asesi;
};
