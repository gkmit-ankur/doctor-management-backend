const jwt = require("jsonwebtoken");
const { User, UserRole, Role } = require("../models");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my-secret-key');
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        req.userId = user.id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required"
                });
            }
            const userRoles = await UserRole.findAll({
                where: { user_id: req.user.id },
                include: [{ model: Role, as: 'role' }]
            });
            const userRoleKeys = userRoles.map(ur => ur.role.key);
            const hasRole = roles.some(role => userRoleKeys.includes(role));
            if (!hasRole) {
                return res.status(403).json({
                    success: false,
                    message: "Insufficient permissions"
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};

module.exports = {
    authenticate,
    authorize
};

