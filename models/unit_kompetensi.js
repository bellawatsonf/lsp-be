"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit_Kompetensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit_Kompetensi.belongsTo(models.Skema, {
        as: "skemas",
        foreignKey: "id_skema",
      });
    }
  }
  Unit_Kompetensi.init(
    {
      kode_unit: DataTypes.STRING,
      judul_unit: DataTypes.STRING,
      id_skema: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Unit_Kompetensi",
    }
  );
  return Unit_Kompetensi;
};
