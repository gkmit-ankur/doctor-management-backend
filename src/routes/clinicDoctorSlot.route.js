const express = require("express");
const { clinicDoctorSlotController } = require("../controllers");
const { clinicDoctorSlotValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(clinicDoctorSlotValidator.createSlotSchema), clinicDoctorSlotController.createClinicDoctorSlot);
router.get("/clinic-doctor/:clinicDoctorId", validate(clinicDoctorSlotValidator.clinicDoctorIdParamSchema, 'params'), clinicDoctorSlotController.getClinicDoctorSlots);
router.get("/doctor/:doctorId", validate(clinicDoctorSlotValidator.doctorIdParamSchema, 'params'), clinicDoctorSlotController.getDoctorSlots);
router.put("/:id", validate(clinicDoctorSlotValidator.slotIdParamSchema, 'params'), validate(clinicDoctorSlotValidator.updateSlotSchema), clinicDoctorSlotController.updateClinicDoctorSlot);
router.delete("/:id", validate(clinicDoctorSlotValidator.slotIdParamSchema, 'params'), clinicDoctorSlotController.deleteClinicDoctorSlot);

module.exports = router;

