"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jadwal.hasMany(models.jadwal_asesiskema, {
        foreignKey: "id_jadwal",
        as: "jadwal",
      });
    }
  }
  Jadwal.init(
    {
      nama_jadwal: DataTypes.STRING,
      tuk: DataTypes.STRING,
      tgl: DataTypes.DATE,
      tipe: DataTypes.STRING,
      status_jadwal: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Jadwal",
    }
  );
  return Jadwal;
};
