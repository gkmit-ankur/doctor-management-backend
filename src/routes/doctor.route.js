const express = require("express");
const { doctorController,clinicDoctorSlotController } = require("../controllers");
const { doctorValidator, clinicDoctorSlotValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(doctorValidator.createDoctorSchema), doctorController.createDoctor);
router.get("/", validate(doctorValidator.doctorQuerySchema, 'query'), doctorController.viewDoctors);
router.get("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.getDoctorById);
router.put("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), validate(doctorValidator.updateDoctorSchema), doctorController.updateDoctor);
router.delete("/:id", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.deleteDoctor);
router.get("/:id/clinics", validate(doctorValidator.doctorIdParamSchema, 'params'), doctorController.getDoctorClinics);
router.get("/:id/appointments", validate(doctorValidator.doctorIdParamSchema, 'params'), validate(doctorValidator.appointmentQuerySchema, 'query'), doctorController.getDoctorAppointments);

router.post("/", validate(clinicDoctorSlotValidator.createSlotSchema), clinicDoctorSlotController.createClinicDoctorSlot);
router.get("/clinic-doctor/:clinicDoctorId", validate(clinicDoctorSlotValidator.clinicDoctorIdParamSchema, 'params'), clinicDoctorSlotController.getClinicDoctorSlots);
router.get("/doctor/:doctorId", validate(clinicDoctorSlotValidator.doctorIdParamSchema, 'params'), clinicDoctorSlotController.getDoctorSlots);
router.put("/:id", validate(clinicDoctorSlotValidator.slotIdParamSchema, 'params'), validate(clinicDoctorSlotValidator.updateSlotSchema), clinicDoctorSlotController.updateClinicDoctorSlot);
router.delete("/:id", validate(clinicDoctorSlotValidator.slotIdParamSchema, 'params'), clinicDoctorSlotController.deleteClinicDoctorSlot);
module.exports = router;