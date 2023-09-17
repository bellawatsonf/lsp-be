"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jadwal_asesiskema_asesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      jadwal_asesiskema_asesor.belongsTo(models.Asesor, {
        foreignKey: "id_asesor",
        as: "asesor",
      });
      jadwal_asesiskema_asesor.belongsTo(models.jadwal_asesiskema, {
        foreignKey: "id_jadwal_asesiskema",
        as: "jadwal_asesiskema",
      });
      // define association here
      jadwal_asesiskema_asesor.hasMany(models.Apl02, {
        foreignKey: "id_jadwal_asesiskema_asesor",
        as: "jadwal_asesiskema_asesor",
      });
    }
  }
  jadwal_asesiskema_asesor.init(
    {
      id_jadwal_asesiskema: DataTypes.INTEGER,
      id_asesor: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "jadwal_asesiskema_asesor",
    }
  );
  return jadwal_asesiskema_asesor;
};
