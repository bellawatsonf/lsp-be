"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../middleware/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Asesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asesor.belongsTo(models.Skema, { as: "Skema", foreignKey: "id_skema" });
      Asesor.hasMany(models.AsesorAsesi, {
        as: "Asesor",
        foreignKey: "id_asesor",
      });
      Asesor.hasMany(models.jadwal_asesiskema_asesor, {
        foreignKey: "id_asesor",
        as: "asesor",
      });
      Asesor.hasMany(models.InfoAsesor, {
        foreignKey: "id_asesor",
        as: "dataAsesor",
      });
    }
  }
  Asesor.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      no_reg: DataTypes.STRING,
      id_skema: DataTypes.INTEGER,
      role: DataTypes.STRING,
      ttd_asesor: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (Asesor) => {
          const hashedPassword = encrypt(Asesor.password);
          Asesor.password = hashedPassword;
        },
      },
      sequelize,
      modelName: "Asesor",
    }
  );
  return Asesor;
};
