'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClinicDoctorSlot extends Model {
    
    static associate(models) {
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
    tableName: 'clinic_doctor_slot',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return ClinicDoctorSlot;
};