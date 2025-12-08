'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_personal_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      dob : {
        type: Sequelize.DATE,
        allowNull: true
      },
      gender : {
        type: Sequelize.ENUM('male', 'female', 'other'),
      },
      contact : {
        type: Sequelize.STRING,
        allowNull: true,
        length: 15
      },
      blood_group : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergency_contact : {
        type: Sequelize.STRING,
        allowNull: true,
        length: 15
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_personal_info');
  }
};