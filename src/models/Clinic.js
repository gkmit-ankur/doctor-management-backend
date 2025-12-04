'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    
    static associate(models) {
      
      Clinic.hasMany(models.ClinicDoctor, {
        foreignKey: 'clinic_id',
        as: 'clinicDoctors'
      });

      Clinic.hasMany(models.Appointment, {
        foreignKey: 'clinic_id',
        as: 'appointments'
      });
      
      Clinic.hasMany(models.ClinicDoctorSlot, {
        foreignKey: 'clinic_id',
        as: 'clinicDoctorSlots'
      });
    }
  }
  Clinic.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nha_id:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Clinic',
    tableName: 'clinics'
  });
  return Clinic;
};