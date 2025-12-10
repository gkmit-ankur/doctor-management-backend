const express = require("express");
const { roleController } = require("../controllers");
const { roleValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(roleValidator.createRoleSchema), roleController.createRole);
router.get("/", roleController.getAllRoles);
router.get("/:id", validate(roleValidator.roleIdParamSchema, 'params'), roleController.getRoleById);
router.put("/:id", validate(roleValidator.roleIdParamSchema, 'params'), validate(roleValidator.updateRoleSchema), roleController.updateRole);
router.delete("/:id", validate(roleValidator.roleIdParamSchema, 'params'), roleController.deleteRole);

module.exports = router;

