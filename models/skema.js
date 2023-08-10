"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skema.hasMany(models.Unit_Kompetensi, {
        as: "unitkompetensi",
        foreignKey: "id_skema",
      });
      Skema.hasMany(models.Asesor, { as: "Skema", foreignKey: "id_skema" });
      Skema.hasMany(models.asesi_skema, {
        as: "skema",
        foreignKey: "id_skema",
      });
    }
  }
  Skema.init(
    {
      no_skema: DataTypes.STRING,
      nama_skema: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skema",
    }
  );
  return Skema;
};
