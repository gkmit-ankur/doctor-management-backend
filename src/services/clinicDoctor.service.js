const { ClinicDoctor, Clinic, User, DoctorInfo } = require("../models");

const assignDoctorToClinic = async (payload) => {
    const { clinic_id, doctor_id, is_active } = payload;
    try {
        const existing = await ClinicDoctor.findOne({
            where: { clinic_id, doctor_id }
        });
        if (existing) {
            return {
                success: false,
                message: "Doctor already assigned to this clinic"
            };
        }
        const clinicDoctor = await ClinicDoctor.create({
            clinic_id,
            doctor_id,
            is_active: is_active !== undefined ? is_active : true
        });
        const fullData = await ClinicDoctor.findByPk(clinicDoctor.id, {
            include: [
                { model: Clinic, as: 'clinic', attributes: ['id', 'name', 'address'] },
                { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
            ]
        });
        return {
            success: true,
            message: "Doctor assigned to clinic successfully",
            data: fullData
        };
    } catch (error) {
        throw error;
    }
};

const getClinicDoctors = async (clinicId) => {
    try {
        const clinicDoctors = await ClinicDoctor.findAll({
            where: { clinic_id: clinicId },
            include: [
                { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
            ]
        });
        return {
            success: true,
            data: clinicDoctors
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorClinics = async (doctorId) => {
    try {
        const clinicDoctors = await ClinicDoctor.findAll({
            where: { doctor_id: doctorId },
            include: [
                { model: Clinic, as: 'clinic', attributes: ['id', 'name', 'address', 'contact'] }
            ]
        });
        return {
            success: true,
            data: clinicDoctors
        };
    } catch (error) {
        throw error;
    }
};

const updateClinicDoctor = async (clinicDoctorId, payload) => {
    const { is_active } = payload;
    try {
        const clinicDoctor = await ClinicDoctor.findByPk(clinicDoctorId);
        if (!clinicDoctor) {
            return {
                success: false,
                message: "Clinic doctor assignment not found"
            };
        }
        await clinicDoctor.update({
            is_active: is_active !== undefined ? is_active : clinicDoctor.is_active
        });
        return {
            success: true,
            message: "Clinic doctor updated successfully",
            data: clinicDoctor
        };
    } catch (error) {
        throw error;
    }
};

const removeDoctorFromClinic = async (clinicDoctorId) => {
    try {
        const clinicDoctor = await ClinicDoctor.findByPk(clinicDoctorId);
        if (!clinicDoctor) {
            return {
                success: false,
                message: "Clinic doctor assignment not found"
            };
        }
        await clinicDoctor.destroy();
        return {
            success: true,
            message: "Doctor removed from clinic successfully"
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    assignDoctorToClinic,
    getClinicDoctors,
    getDoctorClinics,
    updateClinicDoctor,
    removeDoctorFromClinic
};