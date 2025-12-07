const { appointmentService } = require("../services");

const getAllAppointments = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,
            doctor_id: req.query.doctor_id,
            clinic_id: req.query.clinic_id,
            patient_id: req.query.patient_id,
            limit: req.query.limit,
            offset: req.query.offset
        };
        const result = await appointmentService.getAllAppointments(filters);
        return res.status(200).json({
            success: true,
            data: result.data,
            count: result.count
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const result = await appointmentService.getAppointmentById(req.params.id);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
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

const updateAppointmentStatus = async (req, res) => {
    try {
        const result = await appointmentService.updateAppointmentStatus(
            req.params.id,
            req.body.status,
            req.body.notes
        );
        if (!result.success) {
            return res.status(400).json({
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

const deleteAppointment = async (req, res) => {
    try {
        const result = await appointmentService.deleteAppointment(req.params.id);
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
    getAllAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment
};

