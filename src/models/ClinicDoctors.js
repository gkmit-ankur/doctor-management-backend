'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClinicDoctor extends Model {
    
    static associate(models) {
      
      ClinicDoctor.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic'
      });

      ClinicDoctor.belongsTo(models.User, {
        foreignKey: 'doctor_id',
        as: 'doctor'
      });
      
      ClinicDoctor.hasMany(models.ClinicDoctorSlot, {
        foreignKey: 'clinic_doctor_id',
        as: 'slots'
      });
    }
  }
  ClinicDoctor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ClinicDoctor',
    tableName: 'clinic_doctors'
  });
  return ClinicDoctor;
};