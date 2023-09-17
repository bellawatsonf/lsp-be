"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class jadwal_asesiskema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jadwal_asesiskema.belongsTo(models.Skema, {
        foreignKey: "id_skema",
        as: "dataskema",
      });
      jadwal_asesiskema.belongsTo(models.Jadwal, {
        as: "jadwal",
        foreignKey: "id_jadwal",
      });
      jadwal_asesiskema.belongsTo(models.Asesi, {
        // through: "jadwal_Asesis",
        as: "asesis",
        foreignKey: "id_asesis",
      });
      jadwal_asesiskema.hasMany(models.jadwal_asesiskema_asesor, {
        // through: "jadwal_Asesis",
        as: "jadwal_asesiskema",
        foreignKey: "id_jadwal_asesiskema",
      });
    }
  }
  jadwal_asesiskema.init(
    {
      id_skema: DataTypes.INTEGER,
      id_jadwal: DataTypes.INTEGER,
      id_asesis: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      nama_asesis: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "jadwal_asesiskema",
    }
  );
  return jadwal_asesiskema;
};
