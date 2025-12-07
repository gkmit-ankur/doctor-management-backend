const express = require("express");
const { userRoleController } = require("../controllers");
const { userRoleValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validate(userRoleValidator.assignRoleSchema), userRoleController.assignRoleToUser);
router.get("/", userRoleController.getAllUserRoles);
router.get("/user/:userId", validate(userRoleValidator.userIdParamSchema, 'params'), userRoleController.getUserRoles);
router.delete("/:id", validate(userRoleValidator.userRoleIdParamSchema, 'params'), userRoleController.removeRoleFromUser);

module.exports = router;

