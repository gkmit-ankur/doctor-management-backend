const express = require("express");
const { doctorController } = require("../controllers");
const { doctorValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(doctorValidator.createDoctorSchema), doctorController.createDoctor);
router.get("/", validate(doctorValidator.doctorQuerySchema, 'query'), doctorController.viewDoctors);
router.get("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.getDoctorById);
router.put("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), validate(doctorValidator.updateDoctorSchema), doctorController.updateDoctor);
router.delete("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.deleteDoctor);
router.get("/:id/clinics", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.getDoctorClinics);
router.get("/:id/appointments", validate(doctorValidator.doctorIdParamSchema, 'params'), validate(doctorValidator.appointmentQuerySchema, 'query'), doctorController.getDoctorAppointments);

module.exports = router;