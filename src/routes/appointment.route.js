const express = require("express");
const { appointmentController } = require("../controllers");
const { appointmentValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.get("/", validate(appointmentValidator.appointmentQuerySchema, 'query'), appointmentController.getAllAppointments);
router.get("/:id", validate(appointmentValidator.appointmentIdParamSchema, 'params'), appointmentController.getAppointmentById);
router.put("/:id/status", validate(appointmentValidator.appointmentIdParamSchema, 'params'), validate(appointmentValidator.updateStatusSchema), appointmentController.updateAppointmentStatus);
router.delete("/:id", validate(appointmentValidator.appointmentIdParamSchema, 'params'), appointmentController.deleteAppointment);

module.exports = router;

