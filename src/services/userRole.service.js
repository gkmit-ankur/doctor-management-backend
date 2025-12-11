const { UserRole, User, Role } = require("../models");

const assignRoleToUser = async (payload) => {
    const { user_id, role_id } = payload;
    try {
        
        const role = await Role.findByPk(role_id);
        if (!role) {
            return {
                success: false,
                message: "Role not found"
            };
        }
        
        const user = await User.findByPk(user_id);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }
        
        const existing = await UserRole.findOne({
            where: { user_id, role_id }
        });
        if (existing) {
            return {
                success: false,
                message: "Role already assigned to this user"
            };
        }
        const userRole = await UserRole.create({
            user_id,
            role_id
        });
        const fullData = await UserRole.findByPk(userRole.id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
                { model: Role, as: 'role', attributes: ['id', 'key', 'title'] }
            ]
        });
        return {
            success: true,
            message: "Role assigned successfully",
            data: fullData
        };
    } catch (error) {
        throw error;
    }
};

const getUserRoles = async (userId) => {
    try {
        const userRoles = await UserRole.findAll({
            where: { user_id: userId },
            include: [
                { model: Role, as: 'role', attributes: ['id', 'key', 'title'] }
            ]
        });
        return {
            success: true,
            data: userRoles
        };
    } catch (error) {
        throw error;
    }
};

const removeRoleFromUser = async (userRoleId) => {
    try {
        const userRole = await UserRole.findByPk(userRoleId);
        if (!userRole) {
            return {
                success: false,
                message: "User role not found"
            };
        }
        await userRole.destroy();
        return {
            success: true,
            message: "Role removed from user successfully"
        };
    } catch (error) {
        throw error;
    }
};

const getAllUserRoles = async () => {
    try {
        const userRoles = await UserRole.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
                { model: Role, as: 'role', attributes: ['id', 'key', 'title'] }
            ]
        });
        return {
            success: true,
            data: userRoles
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    assignRoleToUser,
    getUserRoles,
    removeRoleFromUser,
    getAllUserRoles
};