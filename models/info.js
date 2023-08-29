"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Info.belongsTo(models.Asesi, {
        as: "dataAsesi",
        foreignKey: "id_asesi",
      });
    }
  }
  Info.init(
    {
      id_asesi: DataTypes.INTEGER,
      info_status: DataTypes.STRING,
      deskripsi_info: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Info",
    }
  );
  return Info;
};
