'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentStatusHistory extends Model {
    
    static associate(models) { 
      AppointmentStatusHistory.belongsTo(models.Appointment, {
        foreignKey: 'appointment_id',
        as: 'appointment'
      });
    }
  }
  AppointmentStatusHistory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'AppointmentStatusHistory',
    tableName: 'appointment_status_history'  
  });
  return AppointmentStatusHistory;
};