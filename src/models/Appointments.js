'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    
    static associate(models) {
      
      Appointment.belongsTo(models.UserPersonalInfo, {
        foreignKey: 'patient_id',
        as: 'patient'
      });
      
      Appointment.belongsTo(models.DoctorInfo, {
        foreignKey: 'doctor_id',
        as: 'doctorInfo'
      });
      
      Appointment.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic'
      });
      
      Appointment.belongsTo(models.Slot, {
        foreignKey: 'slot_id',
        as: 'slot'
      });
      
      Appointment.hasMany(models.AppointmentStatusHistory, {
        foreignKey: 'appointment_id',
        as: 'statusHistory'
      });
    }
  }
  Appointment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    current_status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointment'
  });
  return Appointment;
};