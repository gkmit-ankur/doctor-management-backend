const { clinicService } = require("../services");

const createClinic = async (req, res) => {
    const body = req.body;

    try {
        if (!body.name || !body.address || !body.contact || !body.nha_id) {
            console.log("Please provide the required data");
            return res.status(400).json({
                success: false,
                message: "Name, address, contact, and nha_id are required."
            });
        }

        const clinic = await clinicService.createClinic(body);

        return res.status(201).json({
            success: true,
            data: clinic
        });
    } catch (error) {
        console.error("Error creating clinic:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getClinics = async (req, res) => {
    try {
        const clinics = await clinicService.getClinics();

        return res.status(200).json({
            success: true,
            data: clinics
        });
    } catch (error) {
        console.error("Error fetching clinics:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getClinicById = async (req, res) => {
    const clinicId = parseInt(req.params.clinicId);
    if (isNaN(clinicId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid clinic id"
        });
    }

    try {
        const clinic = await clinicService.getClinicById(clinicId);
        if (!clinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: clinic
        });
    } catch (error) {
        console.error("Error fetching clinic by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateClinic = async (req, res) => {
    const clinicId = parseInt(req.params.clinicId);
    if (isNaN(clinicId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid clinic id"
        });
    }

    try {
        const updatedClinic = await clinicService.updateClinic(clinicId, req.body);
        if (!updatedClinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedClinic
        });
    } catch (error) {
        console.error("Error updating clinic:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteClinic = async (req, res) => {
    const clinicId = parseInt(req.params.clinicId);
    if (isNaN(clinicId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid clinic id"
        });
    }

    try {
        const deleted = await clinicService.deleteClinic(clinicId);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Clinic deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting clinic:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createClinic,
    getClinics,
    getClinicById,
    updateClinic,
    deleteClinic
};