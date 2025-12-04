'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments_status_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  appointments_status_history.init({
    column1: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'appointments_status_history',
  });
  return appointments_status_history;
};