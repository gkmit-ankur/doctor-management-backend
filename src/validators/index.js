const userValidator = require('./user.validator');
const doctorValidator = require('./doctor.validator');
const patientValidator = require('./patient.validator');
const clinicValidator = require('./clinic.validator');
const roleValidator = require('./role.validator');
const userRoleValidator = require('./userRole.validator');
const clinicDoctorValidator = require('./clinicDoctor.validator');
const clinicDoctorSlotValidator = require('./clinicDoctorSlot.validator');
const slotValidator = require('./slot.validator');
const appointmentValidator = require('./appointment.validator');
const authValidator = require('./auth.validator');

module.exports = {
    userValidator,
    doctorValidator,
    patientValidator,
    clinicValidator,
    roleValidator,
    userRoleValidator,
    clinicDoctorValidator,
    clinicDoctorSlotValidator,
    slotValidator,
    appointmentValidator,
    authValidator
};

