const { clinicDoctorSlotService } = require("../services");

const createClinicDoctorSlot = async (req, res) => {
    try {
        const result = await clinicDoctorSlotService.createClinicDoctorSlot(req.body);
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

const getClinicDoctorSlots = async (req, res) => {
    try {
        const result = await clinicDoctorSlotService.getClinicDoctorSlots(req.params.clinicDoctorId);
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

const getDoctorSlots = async (req, res) => {
    try {
        const result = await clinicDoctorSlotService.getDoctorSlots(req.params.doctorId);
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

const updateClinicDoctorSlot = async (req, res) => {
    try {
        const result = await clinicDoctorSlotService.updateClinicDoctorSlot(req.params.id, req.body);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
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

const deleteClinicDoctorSlot = async (req, res) => {
    try {
        const result = await clinicDoctorSlotService.deleteClinicDoctorSlot(req.params.id);
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

module.exports = {
    createClinicDoctorSlot,
    getClinicDoctorSlots,
    getDoctorSlots,
    updateClinicDoctorSlot,
    deleteClinicDoctorSlot
};

