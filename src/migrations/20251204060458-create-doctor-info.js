'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nha_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: true,
        length: 50
      },
      specialization: {
        type: Sequelize.STRING,
        allowNull: true,
        length: 50
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
        length: 50
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        length: 500
      },
      consultation_fee: {
        type: Sequelize.FLOAT,
        allowNull: true,
        length: 50
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
    await queryInterface.dropTable('doctor_info');
  }
};