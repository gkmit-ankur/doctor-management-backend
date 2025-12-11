const { Appointment, AppointmentStatusHistory, UserPersonalInfo, DoctorInfo, Clinic, Slot, User, sequelize } = require("../models");

const getAllAppointments = async (filters = {}) => {
    const { status, doctor_id, clinic_id, patient_id, limit = 50, offset = 0 } = filters;
    const whereClause = {};
    if (status) whereClause.current_status = status;
    if (doctor_id) whereClause.doctor_id = doctor_id;
    if (clinic_id) whereClause.clinic_id = clinic_id;
    if (patient_id) whereClause.patient_id = patient_id;
    
    try {
        const appointments = await Appointment.findAll({
            where: whereClause,
            include: [
                { model: UserPersonalInfo, as: 'patient', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] },
                { model: DoctorInfo, as: 'doctorInfo', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] },
                { model: Clinic, as: 'clinic', attributes: ['id', 'name', 'address'] },
                { model: Slot, as: 'slot', attributes: ['id', 'start_time', 'end_time'] },
                { model: AppointmentStatusHistory, as: 'statusHistory' }
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
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

const getAppointmentById = async (appointmentId) => {
    try {
        const appointment = await Appointment.findByPk(appointmentId, {
            include: [
                { model: UserPersonalInfo, as: 'patient', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] },
                { model: DoctorInfo, as: 'doctorInfo', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] },
                { model: Clinic, as: 'clinic', attributes: ['id', 'name', 'address', 'contact'] },
                { model: Slot, as: 'slot', attributes: ['id', 'start_time', 'end_time'] },
                { model: AppointmentStatusHistory, as: 'statusHistory', order: [['created_at', 'DESC']] }
            ]
        });
        if (!appointment) {
            return {
                success: false,
                message: "Appointment not found"
            };
        }
        return {
            success: true,
            data: appointment
        };
    } catch (error) {
        throw error;
    }
};

const updateAppointmentStatus = async (appointmentId, status, notes) => {
    const t = await sequelize.transaction();
    try {
        const appointment = await Appointment.findByPk(appointmentId, { transaction: t });
        if (!appointment) {
            await t.rollback();
            return {
                success: false,
                message: "Appointment not found"
            };
        }
        const validStatuses = ['scheduled', 'confirmed', 'cancelled', 'deferred'];
        if (!validStatuses.includes(status)) {
            await t.rollback();
            return {
                success: false,
                message: "Invalid status"
            };
        }
        await appointment.update({
            current_status: status,
            notes: notes !== undefined ? notes : appointment.notes
        }, { transaction: t });
        await AppointmentStatusHistory.create({
            appointment_id: appointmentId,
            status: status
        }, { transaction: t });
        await t.commit();
        const full = await getAppointmentById(appointmentId);
            if (!full.success) {
            return {
                success: false,
                message: full.message || "Failed to retrieve appointment"
            };
        }
        return {
            success: true,
            message: "Appointment status updated successfully",
            data: full.data
        };
    } catch (error) {
        try {
        await t.rollback();
        } catch (rollbackErr) {
        }
        throw error;
    }
};

const deleteAppointment = async (appointmentId) => {
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            return {
                success: false,
                message: "Appointment not found"
            };
        }
        await appointment.destroy();
        return {
            success: true,
            message: "Appointment deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment
};