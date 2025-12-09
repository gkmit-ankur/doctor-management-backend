const {patientService} = require("../services");

const createPatientProfile = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }
    try {
        const result = await patientService.createPatientProfile(userId, req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(201).json({
            success: true,
            message: "Profile created",
            data: result.data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const updatePatientProfile = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }
    try {
        const result = await patientService.updatePatientProfile(userId, req.body);
        if (!result.success) {
            const status = result.message === "Patient profile not found" ? 404 : 400;
            return res.status(status).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile updated",
            data: result.data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const getProfileByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }
    try {
        const result = await patientService.getProfileByUserId(userId);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched",
            data: result.data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const listAppointments = async (req, res) => {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid patient id"
        });
    }
    try {
        const result = await patientService.getAppointments(patientId, {
            status: req.query.status,
            limit: req.query.limit,
            offset: req.query.offset
        });
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Appointments fetched",
            data: result.data,
            count: result.count
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const bookAppointment = async (req, res) => {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid patient id"
        });
    }
    try {
        const result = await patientService.bookAppointment(patientId, req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(201).json({
            success: true,
            message: "Appointment booked",
            data: result.data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const cancelAppointment = async (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const appointmentId = parseInt(req.params.appointmentId);
    if (isNaN(patientId) || isNaN(appointmentId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid ids"
        });
    }
    try {
        const result = await patientService.cancelAppointment(appointmentId, patientId);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Appointment cancelled",
            data: result.data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};



module.exports = {
    createPatientProfile,
    updatePatientProfile,
    getProfileByUserId,
    listAppointments,
    bookAppointment,
    cancelAppointment,
};