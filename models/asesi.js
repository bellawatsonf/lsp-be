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
    }
  }
  Asesi.init(
    {
      id_asesi: DataTypes.INTEGER,
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
      kualifikasi_pendidikan: DataTypes.STRING,
      nama_instansi: DataTypes.STRING,
      tlp_kantor: DataTypes.STRING,
      fax: DataTypes.STRING,
      kodepos_kantor: DataTypes.STRING,
      transkrip: DataTypes.BLOB,
      ijazah: DataTypes.BLOB,
      img_ktp: DataTypes.BLOB,
      pas_foto: DataTypes.BLOB,
      surat_pernyataan: DataTypes.BLOB,
      bukti_bayar: DataTypes.BLOB,
      ttd_asesi: DataTypes.BLOB,
      memiliki_nilai_D: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Asesi",
    }
  );
  return Asesi;
};
