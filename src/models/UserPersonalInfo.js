'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPersonalInfo extends Model {

    static associate(models) {
      
      UserPersonalInfo.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      UserPersonalInfo.hasMany(models.Appointment, {
        foreignKey: 'patient_id',
        as: 'appointments'
      });
    }
  }
  UserPersonalInfo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dob' 
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    blood_group: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergency_contact: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserPersonalInfo',
    tableName: 'user_personal_info'
  });
  return UserPersonalInfo;
};