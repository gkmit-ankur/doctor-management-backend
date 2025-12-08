'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
        model: 'UserPersonalInfo',   
        key: 'id'
      },
    },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'DoctorInfo',   
        key: 'id'
      },
    },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Clinic',   
        key: 'id' 
      },
    },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Slot',   
        key: 'id'
      },
      },
      current_status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled','deferred'),
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        length: 500
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
    await queryInterface.dropTable('appointments');
  }
};