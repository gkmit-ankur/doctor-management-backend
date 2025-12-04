'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {

    static associate(models) {
      DoctorInfo.belongsTo(models.User, {
        foreignKey: 'doctor_id',
        as: 'user'
      });
      
      DoctorInfo.hasMany(models.Appointment, {
        foreignKey: 'doctor_id',
        as: 'appointments'
      });
    }
  }
  DoctorInfo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualifications: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consultation_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DoctorInfo',
    tableName: 'doctor_info'
  });
  return DoctorInfo;
};