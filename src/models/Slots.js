'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    
    static associate(models) {
      Slot.hasMany(models.Appointment, {
        foreignKey: 'slot_id',
        as: 'appointments'
      });
    }
  }
  Slot.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Slot',
    tableName: 'slot'
  });
  return Slot;
};