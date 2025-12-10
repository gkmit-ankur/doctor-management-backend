const express = require("express");
const { patientController } = require("../controllers");
const { patientValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/profile/:userId", validate(patientValidator.userIdParamSchema, 'params'), validate(patientValidator.createPatientProfileSchema), patientController.createPatientProfile);
router.put("/profile/:userId", validate(patientValidator.userIdParamSchema, 'params'), validate(patientValidator.updatePatientProfileSchema), patientController.updatePatientProfile);
router.get("/profile/:userId", validate(patientValidator.userIdParamSchema, 'params'), patientController.getProfileByUserId);
router.get("/:patientId/appointments", validate(patientValidator.patientIdParamSchema, 'params'), validate(patientValidator.appointmentQuerySchema, 'query'), patientController.listAppointments);
router.post("/:patientId/appointments", validate(patientValidator.patientIdParamSchema, 'params'), validate(patientValidator.bookAppointmentSchema), patientController.bookAppointment);
router.put("/:patientId/appointments/:appointmentId/cancel", validate(patientValidator.appointmentIdParamSchema, 'params'), patientController.cancelAppointment);

module.exports = router;

