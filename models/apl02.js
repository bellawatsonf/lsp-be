"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apl02 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apl02.belongsTo(models.jadwal_asesiskema_asesor, {
        foreignKey: "id_jadwal_asesiskema_asesor",
        as: "jadwal_asesiskema_asesor",
      });
      Apl02.belongsTo(models.APL01, { foreignKey: "id_apl01", as: "APL01" });
    }
  }
  Apl02.init(
    {
      id_jadwal_asesiskema_asesor: DataTypes.INTEGER,
      id_apl01: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Apl02",
    }
  );
  return Apl02;
};
