'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      
      UserRole.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      
      UserRole.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });
    }
  }
  UserRole.init({
    id :{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_role'
  });
  return UserRole;
};