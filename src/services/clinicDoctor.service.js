const { ClinicDoctor, Clinic, User, DoctorInfo } = require("../models");

const assignDoctorToClinic = async (payload) => {
    const { clinic_id, doctor_id, is_active } = payload;
    try {
        const existing = await ClinicDoctor.findOne({
            where: { clinic_id, doctor_id }
        });
        if (existing) {
            throw new Error("Doctor already assigned to this clinic");
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

const getClinicDoctors = async (clinicId,pagination= {}) => {
    try {
        const {limit = 50, offset = 0} = pagination;
        const { rows,count} = await ClinicDoctor.findAndCountAll({
            where: { clinic_id: clinicId },
            include: [
                { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
            ],
            limit: parseInt(limit,10),
            offset: parseInt(offset,10)
        });
        return {
            success: true,
            data: rows,
            count
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorClinics = async (doctorId,pagination = {}) => {
    try {
        const {limit =50 ,offset=0} = pagination;
        const { rows,count} = await ClinicDoctor.findAndCountAll({
            where: { doctor_id: doctorId },
            include: [
                { model: Clinic, as: 'clinic', attributes: ['id', 'name', 'address', 'contact'] }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        return {
            success: true,
            data: rows,
            count
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
        await clinicDoctor.update({is_active});
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