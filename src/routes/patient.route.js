const express = require("express");
const { patientController } = require("../controllers");
const router = express.Router();

router.post("/profile/:userId", patientController.createPatientProfile);
router.put("/profile/:userId", patientController.updatePatientProfile);
router.get("/profile/:userId", patientController.getProfileByUserId);
router.get("/:patientId/appointments", patientController.listAppointments);
router.post("/:patientId/appointments", patientController.bookAppointment);
router.put("/:patientId/appointments/:appointmentId/cancel", patientController.cancelAppointment);


module.exports = router;

