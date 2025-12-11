'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClinicDoctorSlot extends Model {
    
    static associate(models) {
      
      ClinicDoctorSlot.belongsTo(models.ClinicDoctor, {
        foreignKey: 'clinic_doctor_id',
        as: 'clinicDoctor'
      });
      
      ClinicDoctorSlot.belongsTo(models.User, {
        foreignKey: 'doctor_id',
        as: 'doctor'
      });
    }
  }
  ClinicDoctorSlot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clinic_doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    slot_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ClinicDoctorSlot',
    tableName: 'clinic_doctor_slots'
  });
  return ClinicDoctorSlot;
};