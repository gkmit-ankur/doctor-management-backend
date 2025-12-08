const express = require("express");
const { doctorController } = require("../controllers");
const router = express.Router();



router.post("/", doctorController.createDoctor);
router.get("/", doctorController.viewDoctors);
router.get("/:id", doctorController.getDoctor);
router.put("/:id", doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);
router.get("/:id/clinics", doctorController.getDoctorClinics);
router.get("/:id/appointments", doctorController.getDoctorAppointments);


module.exports = router;