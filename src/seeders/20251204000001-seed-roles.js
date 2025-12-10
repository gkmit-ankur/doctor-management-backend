'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        key: 'admin',
        title: 'Administrator',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'doctor',
        title: 'Doctor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'patient',
        title: 'Patient',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};

