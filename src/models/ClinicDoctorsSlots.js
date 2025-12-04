'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clinic_doctors_slots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clinic_doctors_slots.init({
    column1: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clinic_doctors_slots',
  });
  return clinic_doctors_slots;
};