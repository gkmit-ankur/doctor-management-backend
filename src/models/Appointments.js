'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    
    static associate(models) {
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
    tableName: 'appointment',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return Appointment;
};