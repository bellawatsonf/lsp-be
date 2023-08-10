"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../middleware/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.APL01, { as: "admins", foreignKey: "id_admin" });
    }
  }
  Admin.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      ttd_admin: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (Admin) => {
          const hashedPasssword = encrypt(Admin.password);
          Admin.password = hashedPasssword;
        },
      },
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
