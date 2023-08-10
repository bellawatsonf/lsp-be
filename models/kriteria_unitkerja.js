"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kriteria_UnitKerja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kriteria_UnitKerja.belongsTo(models.Unit_Kompetensi, {
        as: "kriteria_unitkerja",
        foreignKey: "id_unit_kompetensi",
      });
      // Kriteria_UnitKerja.hasMany(models.APL01, {
      //   as: "Kriteria_UnitKerja",
      //   foreignKey: "id_kriteria_unitkerja",
      // });
    }
  }
  Kriteria_UnitKerja.init(
    {
      elemen: DataTypes.STRING,
      id_unit_kompetensi: DataTypes.INTEGER,
      kriteriakerja: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Kriteria_UnitKerja",
    }
  );
  return Kriteria_UnitKerja;
};
