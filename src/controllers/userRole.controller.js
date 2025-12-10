const { userRoleService } = require("../services");

const assignRoleToUser = async (req, res) => {
    try {
        const result = await userRoleService.assignRoleToUser(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(201).json({
            success: true,
            message: result.message,
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserRoles = async (req, res) => {
    try {
        const result = await userRoleService.getUserRoles(req.params.userId);
        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeRoleFromUser = async (req, res) => {
    try {
        const result = await userRoleService.removeRoleFromUser(req.params.id);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllUserRoles = async (req, res) => {
    try {
        const result = await userRoleService.getAllUserRoles();
        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    assignRoleToUser,
    getUserRoles,
    removeRoleFromUser,
    getAllUserRoles
};

