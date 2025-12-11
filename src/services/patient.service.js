const { UserPersonalInfo, User, Appointment, DoctorInfo, Clinic, Slot, AppointmentStatusHistory, sequelize } = require("../models");
const { getAppointmentById } = require("./appointment.service");

const createPatientProfile = async (userId, payload) => {
    const {
        date_of_birth,
        gender,
        contact,
        blood_group,
        emergency_contact
    } = payload;
    try {
        const existing = await UserPersonalInfo.findOne({
            where: {
                user_id: userId
            }
        });
        if (existing) {
            return {
                success: false,
                message: "Patient profile already exists"
            };
        }
        await UserPersonalInfo.create({
            user_id: userId,
            date_of_birth: date_of_birth || null,
            gender: gender || null,
            contact: contact || null,
            blood_group: blood_group || null,
            emergency_contact: emergency_contact || null
        });
        const fresh = await UserPersonalInfo.findOne({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "name", "email"]
            }]
        });
        return {
            success: true,
            data: fresh
        };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
};

const updatePatientProfile = async (userId, payload) => {
    const {
        date_of_birth,
        gender,
        contact,
        blood_group,
        emergency_contact
    } = payload;
    try {
        const profile = await UserPersonalInfo.findOne({
            where: {
                user_id: userId
            }
        });
        if (!profile) {
            return {
                success: false,
                message: "Patient profile not found"
            };
        }
        await profile.update({
            date_of_birth: date_of_birth !== undefined ? date_of_birth : profile.date_of_birth,
            gender: gender !== undefined ? gender : profile.gender,
            contact: contact !== undefined ? contact : profile.contact,
            blood_group: blood_group !== undefined ? blood_group : profile.blood_group,
            emergency_contact: emergency_contact !== undefined ? emergency_contact : profile.emergency_contact
        });
        const fresh = await UserPersonalInfo.findOne({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "name", "email"]
            }]
        });
        return {
            success: true,
            data: fresh
        };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
};

const getProfileByUserId = async (userId) => {
    try {
        const profile = await UserPersonalInfo.findOne({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "name", "email"]
            }]
        });
        if (!profile) return {
            success: false,
            message: "Patient profile not found"
        };
        return {
            success: true,
            data: profile
        };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
};

const getAppointments = async (patientId, filters = {}) => {
    const {
        status,
        limit = 50,
        offset = 0
    } = filters;
    const whereClause = {
        patient_id: patientId
    };
    if (status) whereClause.current_status = status;
    try {
        const data = await Appointment.findAll({
            where: whereClause,
            include: [{
                    model: DoctorInfo,
                    as: "doctorInfo",
                    include: [{
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"]
                    }]
                },
                {
                    model: Clinic,
                    as: "clinic",
                    attributes: ["id", "name", "address", "contact"]
                },
                {
                    model: Slot,
                    as: "slot",
                    attributes: ["id", "start_time", "end_time"]
                },
                {
                    model: AppointmentStatusHistory,
                    as: "statusHistory"
                }
            ],
            order: [
                ["created_at", "DESC"]
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        return {
            success: true,
            data,
            count: data.length
        };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
};

const bookAppointment = async (patientId, payload) => {
    const {
        doctor_id,
        clinic_id,
        slot_id,
        notes,
        current_status
    } = payload;
    const t = await sequelize.transaction();
    try {
        if (!doctor_id || !clinic_id || !slot_id) {
            await t.rollback();
            return {
                success: false,
                message: "doctor_id, clinic_id, slot_id are required"
            };
        }
        const existing = await Appointment.findOne({ //FIX
            where: {
                doctor_id,
                clinic_id,
                slot_id,
                current_status: ["scheduled"]
            },
            transaction: t
        });
        if (existing) {
            await t.rollback();
            return {
                success: false,
                message: "Slot already booked"
            };
        }
        const patientRecord = await UserPersonalInfo.findByPk(patientId, { transaction: t }) ||
            await UserPersonalInfo.findOne({ where: { user_id: patientId }, transaction: t });
        if (!patientRecord) {
            await t.rollback();
            return {
                success: false,
                message: "Patient not found"
            };
        }
        const appt = await Appointment.create({
            patient_id: patientId,
            doctor_id,
            clinic_id,
            slot_id,
            current_status : "scheduled",
            notes: notes || null
        }, {
            transaction: t
        });
        await AppointmentStatusHistory.create({
            appointment_id: appt.id,
            status: "scheduled"
        }, {
            transaction: t
        });
        await t.commit();
        const full = await getAppointmentById(appt.id);
        if (!full.success) {
            return {
                success: false,
                message: full.message || "Failed to retrieve appointment"
            };
        }
        return {
            success: true,
            message: "Appointment booked",
            data: full.data
        };
    } catch (err) {
        try {
        await t.rollback();
        } catch (rollbackErr) {
        }
        return {
            success: false,
            message: err.message
        };
    }
};

const cancelAppointment = async (appointmentId, patientId) => {
    const t = await sequelize.transaction();
    try {
        const appt = await Appointment.findOne({
            where: {
                id: appointmentId,
                patient_id: patientId
            },
            transaction: t
        });
        if (!appt) {
            await t.rollback();
            return {
                success: false,
                message: "Appointment not found"
            };
        }
        if (appt.current_status === "cancelled") {
            await t.rollback();
            return {
                success: false,
                message: "Already cancelled"
            };
        }
        await appt.update({
            current_status: "cancelled"
        }, {
            transaction: t
        });
        await AppointmentStatusHistory.create({
            appointment_id: appt.id,
            status: "cancelled"
        }, {
            transaction: t
        });
        await t.commit();
        const full = await getAppointmentById(appointmentId,);
         if (!full.success) {
            return {
                success: false,
                message: full.message || "Failed to retrieve appointment"
            };
        }
        return {
            success: true,
            message: "Appointment cancelled",
            data: full.data
        };
    } catch (err) {
        try{
        await t.rollback();
        } catch (rollbackErr) {
        }
        return {
            success: false,
            message: err.message
        };
    }
};


module.exports = {
    createPatientProfile,
    updatePatientProfile,
    getProfileByUserId,
    getAppointments,
    bookAppointment,
    cancelAppointment,
    
}