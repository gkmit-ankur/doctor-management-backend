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
    nha_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: true
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consultation_fee: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'DoctorInfo',
    tableName: 'doctor_info'
  });
  return DoctorInfo;
};