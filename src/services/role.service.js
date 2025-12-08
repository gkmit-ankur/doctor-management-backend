const { Role, UserRole } = require("../models");

const createRole = async (payload) => {
    const { key, title, description } = payload;
    try {
        const existing = await Role.findOne({
            where: { key: key }
        });
        if (existing) {
            return {
                success: false,
                message: "Role with this key already exists"
            };
        }
        const role = await Role.create({
            key,
            title,
            description: description || null
        });
        return {
            success: true,
            message: "Role created successfully",
            data: role
        };
    } catch (error) {
        throw error;
    }
};

const getAllRoles = async () => {
    try {
        const roles = await Role.findAll({
            order: [['id', 'ASC']]
        });
        return {
            success: true,
            data: roles
        };
    } catch (error) {
        throw error;
    }
};

const getRoleById = async (roleId) => {
    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return {
                success: false,
                message: "Role not found"
            };
        }
        return {
            success: true,
            data: role
        };
    } catch (error) {
        throw error;
    }
};

const updateRole = async (roleId, payload) => {
    const { key, title, description } = payload;
    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return {
                success: false,
                message: "Role not found"
            };
        }
        if (key && key !== role.key) {
            const existing = await Role.findOne({ where: { key: key } });
            if (existing) {
                return {
                    success: false,
                    message: "Role with this key already exists"
                };
            }
        }
        await role.update({
            key: key !== undefined ? key : role.key,
            title: title !== undefined ? title : role.title,
            description: description !== undefined ? description : role.description
        });
        return {
            success: true,
            message: "Role updated successfully",
            data: role
        };
    } catch (error) {
        throw error;
    }
};

const deleteRole = async (roleId) => {
    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return {
                success: false,
                message: "Role not found"
            };
        }
        await role.destroy();
        return {
            success: true,
            message: "Role deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};