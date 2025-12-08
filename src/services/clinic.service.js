const { Clinic } = require("../models");

const createClinic = async (payload) => {
    const {
        name,
        address,
        contact,
        nha_id,
        is_active
    } = payload;
    try {
        const existing = await Clinic.findOne({
            where: {
                nha_id: nha_id
            }
        });
        if (existing) {
            return {
                success: false,
                message: "Clinic with this NHA ID already exists"
            };
        }
        const clinic = await Clinic.create({
            name,
            address,
            contact,
            nha_id,
            is_active: is_active !== undefined ? is_active : true
        });
        return {
            success: true,
            data: clinic
        };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
};

const getClinics = async () => {
    try {
        const clinics = await Clinic.findAll();
        return clinics;
    } catch (err) {
        throw err;
    }
};

const getClinicById = async (clinicId) => {
    try {
        const clinic = await Clinic.findByPk(clinicId);
        return clinic;
    } catch (err) {
        throw err;
    }
};

const deleteClinic = async (clinicId) => {
    try {
        const clinic = await Clinic.findByPk(clinicId);
        if (!clinic) {
            return {
                success: false,
                message: "Clinic not found"
            };
        }
        await clinic.destroy();
        return {
            success: true,
            message: "Clinic deleted successfully"
        };
    } catch (err) {
        throw err;
    }
};
const updateClinic = async (clinicId, payload) => {
    try {
        const clinic = await Clinic.findByPk(clinicId);
        if (!clinic) {
            return {
                success: false,
                message: "Clinic not found"
            };
        }
        await clinic.update(payload);
        return {
            success: true,
            message: "Clinic updated successfully",
            data: clinic
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createClinic,
    getClinics,
    getClinicById,
    updateClinic,
    deleteClinic
};