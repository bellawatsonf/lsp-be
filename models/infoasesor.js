"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfoAsesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfoAsesor.belongsTo(models.Asesor, {
        foreignKey: "id_asesor",
        as: "dataAsesor",
      });
    }
  }
  InfoAsesor.init(
    {
      id_asesor: DataTypes.INTEGER,
      info_status: DataTypes.STRING,
      deskripsi_info: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InfoAsesor",
    }
  );
  return InfoAsesor;
};
