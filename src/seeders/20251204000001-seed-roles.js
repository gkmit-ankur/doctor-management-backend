'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        key: 'admin',
        title: 'Administrator',
        description: 'System administrator with full access',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'doctor',
        title: 'Doctor',
        description: 'Medical doctor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'patient',
        title: 'Patient',
        description: 'Patient user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};

