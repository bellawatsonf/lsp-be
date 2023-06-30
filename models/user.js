"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../middleware/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, { as: "Role", foreignKey: "id_role" });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      id_role: DataTypes.INTEGER,
    },

    {
      hooks: {
        beforeCreate: (user, option) => {
          const hashedPassword = encrypt(user.password);
          user.password = hashedPassword;
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
