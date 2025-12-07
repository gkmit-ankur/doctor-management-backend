const { clinicDoctorService } = require("../services");

const assignDoctorToClinic = async (req, res) => {
    try {
        const result = await clinicDoctorService.assignDoctorToClinic(req.body);
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

const getClinicDoctors = async (req, res) => {
    try {
        const result = await clinicDoctorService.getClinicDoctors(req.params.clinicId);
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

const getDoctorClinics = async (req, res) => {
    try {
        const result = await clinicDoctorService.getDoctorClinics(req.params.doctorId);
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

const updateClinicDoctor = async (req, res) => {
    try {
        const result = await clinicDoctorService.updateClinicDoctor(req.params.id, req.body);
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

const removeDoctorFromClinic = async (req, res) => {
    try {
        const result = await clinicDoctorService.removeDoctorFromClinic(req.params.id);
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
    assignDoctorToClinic,
    getClinicDoctors,
    getDoctorClinics,
    updateClinicDoctor,
    removeDoctorFromClinic
};

