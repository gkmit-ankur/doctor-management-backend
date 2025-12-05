const express = require("express");
const { doctorController } = require("../controllers");
const router = express.Router();



router.post("/", doctorController.createDoctor);
router.get("/", doctorController.viewDoctors);
router.get("/user/:userId", doctorController.getDoctorByUserId);
router.get("/:id", doctorController.getDoctorById);
router.put("/:id", doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);
router.get("/:id/clinics", doctorController.getDoctorClinics);
router.get("/:id/appointments", doctorController.getDoctorAppointments);


module.exports = router;