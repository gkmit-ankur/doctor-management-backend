const express = require("express");
const { clinicDoctorController } = require("../controllers");
const { clinicDoctorValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(clinicDoctorValidator.assignDoctorSchema), clinicDoctorController.assignDoctorToClinic);
router.get("/clinic/:clinicId", validate(clinicDoctorValidator.clinicIdParamSchema, 'params'), validate(clinicDoctorValidator.paginationQuerySchema,'query'),clinicDoctorController.getClinicDoctors);
router.get("/doctor/:doctorId", validate(clinicDoctorValidator.doctorIdParamSchema, 'params'), validate(clinicDoctorValidator.paginationQuerySchema,'query'),clinicDoctorController.getDoctorClinics);
router.put("/:id", validate(clinicDoctorValidator.clinicDoctorIdParamSchema, 'params'), validate(clinicDoctorValidator.updateClinicDoctorSchema), clinicDoctorController.updateClinicDoctor);
router.delete("/:id", validate(clinicDoctorValidator.clinicDoctorIdParamSchema, 'params'), clinicDoctorController.removeDoctorFromClinic);

module.exports = router;

