'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {

    static associate(models) {
      
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
    tableName: 'doctor_info',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return DoctorInfo;
};