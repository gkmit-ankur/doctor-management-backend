const { ClinicDoctorSlot, ClinicDoctor, User, Clinic } = require("../models");

const createClinicDoctorSlot = async (payload) => {
    const { clinic_doctor_id, doctor_id, slot_time } = payload;
    try {
        const existing = await ClinicDoctorSlot.findOne({
            where: { clinic_doctor_id, doctor_id, slot_time }
        });
        if (existing) {
            return {
                success: false,
                message: "Slot already exists for this doctor at this clinic"
            };
        }
        const slot = await ClinicDoctorSlot.create({
            clinic_doctor_id,
            doctor_id,
            slot_time
        });
        const fullData = await ClinicDoctorSlot.findByPk(slot.id, {
            include: [
                { model: ClinicDoctor, as: 'clinicDoctor' },
                { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
            ]
        });
        return {
            success: true,
            message: "Slot created successfully",
            data: fullData
        };
    } catch (error) {
        throw error;
    }
};

const getClinicDoctorSlots = async (clinicDoctorId) => {
    try {
        const slots = await ClinicDoctorSlot.findAll({
            where: { clinic_doctor_id: clinicDoctorId },
            include: [
                { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
            ],
            order: [['slot_time', 'ASC']]
        });
        return {
            success: true,
            data: slots
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorSlots = async (doctorId) => {
    try {
        const slots = await ClinicDoctorSlot.findAll({
            where: { doctor_id: doctorId },
            include: [
                { model: ClinicDoctor, as: 'clinicDoctor', include: [{ model: Clinic, as: 'clinic' }] }
            ],
            order: [['slot_time', 'ASC']]
        });
        return {
            success: true,
            data: slots
        };
    } catch (error) {
        throw error;
    }
};

const updateClinicDoctorSlot = async (slotId, payload) => {
    const { slot_time } = payload;
    try {
        const slot = await ClinicDoctorSlot.findByPk(slotId);
        if (!slot) {
            return {
                success: false,
                message: "Slot not found"
            };
        }
        await slot.update({
            slot_time: slot_time !== undefined ? slot_time : slot.slot_time
        });
        return {
            success: true,
            message: "Slot updated successfully",
            data: slot
        };
    } catch (error) {
        throw error;
    }
};

const deleteClinicDoctorSlot = async (slotId) => {
    try {
        const slot = await ClinicDoctorSlot.findByPk(slotId);
        if (!slot) {
            return {
                success: false,
                message: "Slot not found"
            };
        }
        await slot.destroy();
        return {
            success: true,
            message: "Slot deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createClinicDoctorSlot,
    getClinicDoctorSlots,
    getDoctorSlots,
    updateClinicDoctorSlot,
    deleteClinicDoctorSlot
};

