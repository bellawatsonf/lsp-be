'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Skema.init({
    no_skema: DataTypes.STRING,
    nama_skema: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skema',
  });
  return Skema;
};