const express = require("express");
const { userController,userRoleController } = require("../controllers");
const { userValidator,userRoleValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/users", validate(userValidator.createUserSchema), userController.createUser);
router.get("/view", userController.viewUsers);

router.post("/", validate(userRoleValidator.assignRoleSchema), userRoleController.assignRoleToUser);
router.get("/", userRoleController.getAllUserRoles);
router.get("/user/:userId", validate(userRoleValidator.userIdParamSchema, 'params'), userRoleController.getUserRoles);
router.delete("/:id", validate(userRoleValidator.userRoleIdParamSchema, 'params'), userRoleController.removeRoleFromUser);
module.exports = router;