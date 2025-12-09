const {doctorService} = require("../services");

const createDoctor = async (req, res, next) => {
    const body = req.body;

    try {
        if (!body.doctor_id || !body.specialization || !body.qualifications || !body.experience || !body.contact || !body.consultation_fee) {
            return res.status(400).json({
                success: false,
                message: "Enter all the required fields"
            });
        }

        const result = await doctorService.createDoctor(body);
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
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const viewDoctors = async (req, res, next) => {
    try {
        const filters = {
            specialization: req.query.specialization,
            limit: req.query.limit,
            offset: req.query.offset
        };

        const result = await doctorService.viewDoctors(filters);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Internal server error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: result.data,
            count: result.count
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getDoctor = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const by = (req.query.by || "").toLowerCase();

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            });
        }

        const result = by === "user"
            ? await doctorService.getDoctorByUserId(id)
            : await doctorService.getDoctorById(id);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully",
            data: result.data
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const updateDoctor = async (req, res, next) => {
    try {
        const doctorId = parseInt(req.params.id);

        if (isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID"
            });
        }

        const result = await doctorService.updateDoctor(doctorId, req.body);

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
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const deleteDoctor = async (req, res, next) => {
    try {
        const doctorId = parseInt(req.params.id);

        if (isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID"
            });
        }

        const result = await doctorService.deleteDoctor(doctorId);

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
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getDoctorClinics = async (req, res, next) => {
    try {
        const doctorId = parseInt(req.params.id);

        if (isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID"
            });
        }

        const result = await doctorService.getDoctorClinics(doctorId);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor clinics fetched successfully",
            data: result.data,
            count: result.count
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getDoctorAppointments = async (req, res, next) => {
    try {
        const doctorId = parseInt(req.params.id);

        if (isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID"
            });
        }

        const filters = {
            status: req.query.status,
            limit: req.query.limit,
            offset: req.query.offset
        };

        const result = await doctorService.getDoctorAppointments(doctorId, filters);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Internal server error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor appointments fetched successfully",
            data: result.data,
            count: result.count
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createDoctor,
    viewDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorClinics,
    getDoctorAppointments,
};