"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class asesi_skema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      asesi_skema.belongsTo(models.Asesi, {
        as: "asesi",
        foreignKey: "id_asesi",
      });
      asesi_skema.belongsTo(models.Skema, {
        as: "skema",
        foreignKey: "id_skema",
      });
      asesi_skema.hasMany(models.APL01, {
        as: "asesi_skema",
        foreignKey: "id_asesi_skema",
      });
    }
  }
  asesi_skema.init(
    {
      id_asesi: DataTypes.INTEGER,
      id_skema: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "asesi_skema",
    }
  );
  return asesi_skema;
};
