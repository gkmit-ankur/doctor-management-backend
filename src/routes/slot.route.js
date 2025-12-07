const express = require("express");
const { slotController } = require("../controllers");
const { slotValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(slotValidator.createSlotSchema), slotController.createSlot);
router.get("/", slotController.getAllSlots);
router.get("/:id", validate(slotValidator.slotIdParamSchema, 'params'), slotController.getSlotById);
router.put("/:id", validate(slotValidator.slotIdParamSchema, 'params'), validate(slotValidator.updateSlotSchema), slotController.updateSlot);
router.delete("/:id", validate(slotValidator.slotIdParamSchema, 'params'), slotController.deleteSlot);

module.exports = router;

