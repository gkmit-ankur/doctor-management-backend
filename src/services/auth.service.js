const { User, UserRole, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
    try {
        const user = await User.findOne({
            where: { email: email },
            include: [
                { model: UserRole, as: 'userRoles', include: [{ model: Role, as: 'role' }] }
            ]
        });
        if (!user) {
            return {
                success: false,
                message: "Invalid email or password"
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid email or password"
            };
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'my-secret-key',
            { expiresIn: '24h' }
        );
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.userRoles.map(ur => ur.role)
        };
        return {
            success: true,
            message: "Login successful",
            data: {
                user: userData,
                token: token
            }
        };
    } catch (error) {
        throw error;
    }
};

const register = async (payload) => {
    const { name, email, password, role_id } = payload;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists"
            };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        if (role_id) {
            await UserRole.create({
                user_id: user.id,
                role_id: role_id
            });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'my-secret-key',
            { expiresIn: '24h' }
        );
        return {
            success: true,
            message: "Registration successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token: token
            }
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
    register
};

