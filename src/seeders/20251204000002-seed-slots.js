'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const slots = [];
    // Generate slots from 9 AM to 5 PM, every 30 minutes
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endMinute = minute + 30;
        const endHour = endMinute >= 60 ? hour + 1 : hour;
        const finalEndMinute = endMinute >= 60 ? endMinute - 60 : endMinute;
        const endTime = `${endHour.toString().padStart(2, '0')}:${finalEndMinute.toString().padStart(2, '0')}`;
        
        slots.push({
          start_time: startTime,
          end_time: endTime,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }
    
    await queryInterface.bulkInsert('slot', slots, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('slot', null, {});
  }
};

