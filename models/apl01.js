"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class APL01 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // APL01.belongsTo(models.Asesi, { as: "Asesis", foreignKey: "id_asesi" });
      APL01.belongsTo(models.Admin, { as: "admins", foreignKey: "id_admin" });
      APL01.belongsTo(models.asesi_skema, {
        as: "asesi_skema",
        foreignKey: "id_asesi_skema",
      });
    }
  }
  APL01.init(
    {
      // id_asesi: DataTypes.INTEGER,
      id_admin: DataTypes.INTEGER,
      rekomendasi_sebagai_asesi: {
        type: DataTypes.BOOLEAN,
        // defaultValue: false,
      },
      id_asesi_skema: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "APL01",
    }
  );
  return APL01;
};
