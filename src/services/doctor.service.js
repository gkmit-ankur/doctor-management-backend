const {DoctorInfo,User,ClinicDoctor,Clinic,Appointment,ClinicDoctorSlot} = require("../models");

const createDoctor = async (payload) => {
    const {
        doctor_id,
        nha_id,
        specialization,
        qualification,
        experience,
        contact,
        bio,
        consultation_fee
    } = payload;

    try {
        if (!doctor_id || !nha_id) {
            return {
                success: false,
                message: "doctor_id and nha_id are required"
            };
        }

        const user = await User.findByPk(doctor_id);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        const existingDoctor = await DoctorInfo.findOne({
            where: {
                doctor_id: doctor_id
            }
        });

        if (existingDoctor) {
            return {
                success: false,
                message: "Doctor is already exists for this user"
            };
        }

        const newDoctor = await DoctorInfo.create({
            doctor_id,
            nha_id,
            specialization: specialization || null,
            qualification: qualification || null,
            experience: experience || null,
            contact: contact || null,
            bio: bio || null,
            consultation_fee: consultation_fee || null
        });

        return {
            success: true,
            message: "Doctor info created successfully",
            data: newDoctor
        };
    } catch (error) {
        throw error;
    }
};


const viewDoctors = async (filters = {}) => {
    try {
        const {
            specialization,
            limit = 50,
            offset = 0
        } = filters;
        const whereClause = {};

        if (specialization) {
            whereClause.specialization = specialization;
        }

        const doctors = await DoctorInfo.findAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Appointment,
                    as: 'appointments',
                    attributes: ['id', 'current_status', 'created_at']
                }
            ],
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at']
            }
        });

        return {
            success: true,
            data: doctors,
            count: doctors.length
        };
    } catch (error) {
        throw error;
    }
};


const getDoctorById = async (doctorId) => {
    try {
        const doctor = await DoctorInfo.findByPk(doctorId, {
            include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Appointment,
                    as: 'appointments',
                    include: [{
                        model: Clinic,
                        as: 'clinic',
                        attributes: ['id', 'name', 'address']
                    }]
                }
            ],
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at']
            }
        });

        if (!doctor) {
            return {
                success: false,
                message: "Doctor not found"
            };
        }

        return {
            success: true,
            data: doctor
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorByUserId = async (userId) => {
    try {
        const doctor = await DoctorInfo.findOne({
            where: {
                doctor_id: userId
            },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }],
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at']
            }
        });

        if (!doctor) {
            return {
                success: false,
                message: "Doctor not found"
            };
        }

        return {
            success: true,
            data: doctor
        };
    } catch (error) {
        throw error;
    }
};


const updateDoctor = async (doctorId, payload) => {
    try {
        const doctor = await DoctorInfo.findByPk(doctorId);

        if (!doctor) {
            return {
                success: false,
                message: "Doctor not found"
            };
        }

        await doctor.update(payload);

        return {
            success: true,
            message: "Doctor info updated successfully",
            data: doctor
        };
    } catch (error) {
        throw error;
    }
};

const deleteDoctor = async (doctorId) => {
    try {
        const doctor = await DoctorInfo.findByPk(doctorId);

        if (!doctor) {
            return {
                success: false,
                message: "Doctor not found"
            };
        }

        await doctor.destroy();

        return {
            success: true,
            message: "Doctor info deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorClinics = async (doctorId) => {
    try {
        const doctor = await DoctorInfo.findByPk(doctorId);

        if (!doctor) {
            return {
                success: false,
                message: "Doctor not found"
            };
        }

        const clinicDoctors = await ClinicDoctor.findAll({
            where: {
                doctor_id: doctor.doctor_id,
                is_active: true
            },
            include: [{
                model: Clinic,
                as: 'clinic',
                attributes: ['id', 'name', 'address', 'contact', 'nha_id', 'is_active']
            }]
        });

        return {
            success: true,
            data: clinicDoctors,
            count: clinicDoctors.length
        };
    } catch (error) {
        throw error;
    }
};

const getDoctorAppointments = async (doctorId, filters = {}) => {
    try {
        const {
            status,
            limit = 50,
            offset = 0
        } = filters;
        const whereClause = {
            doctor_id: doctorId
        };

        if (status) {
            whereClause.current_status = status;
        }

        const appointments = await Appointment.findAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{
                model: Clinic,
                as: 'clinic',
                attributes: ['id', 'name', 'address']
            }],
            order: [
                ['created_at', 'DESC']
            ],
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at']
            }
        });

        return {
            success: true,
            data: appointments,
            count: appointments.length
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createDoctor,
    viewDoctors,
    getDoctorById,
    getDoctorByUserId,
    updateDoctor,
    deleteDoctor,
    getDoctorClinics,
    getDoctorAppointments,
};