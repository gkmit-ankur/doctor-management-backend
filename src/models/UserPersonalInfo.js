'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPersonalInfo extends Model {

    static associate(models) {
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
    tableName: 'user_personal_info',
    timestamps: true,      
    paranoid: true,        
    underscored: true,     
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return UserPersonalInfo;
};