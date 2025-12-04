'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_personal_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_personal_info.init({
    column1: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_personal_info',
  });
  return user_personal_info;
};