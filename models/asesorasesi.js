"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AsesorAsesi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AsesorAsesi.belongsTo(models.Asesor, {
        foreignKey: "id_asesor",
        as: "Asesor",
      });
      AsesorAsesi.belongsTo(models.Asesi, {
        foreignKey: "id_asesi",
        as: "Asesi",
      });
    }
  }
  AsesorAsesi.init(
    {
      id_asesor: DataTypes.INTEGER,
      id_asesi: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AsesorAsesi",
    }
  );
  return AsesorAsesi;
};
