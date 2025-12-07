const { Slot, Appointment } = require("../models");

const createSlot = async (payload) => {
    const { start_time, end_time } = payload;
    try {
        const existing = await Slot.findOne({
            where: { start_time, end_time }
        });
        if (existing) {
            return {
                success: false,
                message: "Slot with this time already exists"
            };
        }
        const slot = await Slot.create({
            start_time,
            end_time
        });
        return {
            success: true,
            message: "Slot created successfully",
            data: slot
        };
    } catch (error) {
        throw error;
    }
};

const getAllSlots = async () => {
    try {
        const slots = await Slot.findAll({
            order: [['start_time', 'ASC']]
        });
        return {
            success: true,
            data: slots
        };
    } catch (error) {
        throw error;
    }
};

const getSlotById = async (slotId) => {
    try {
        const slot = await Slot.findByPk(slotId, {
            include: [
                { model: Appointment, as: 'appointments' }
            ]
        });
        if (!slot) {
            return {
                success: false,
                message: "Slot not found"
            };
        }
        return {
            success: true,
            data: slot
        };
    } catch (error) {
        throw error;
    }
};

const updateSlot = async (slotId, payload) => {
    const { start_time, end_time } = payload;
    try {
        const slot = await Slot.findByPk(slotId);
        if (!slot) {
            return {
                success: false,
                message: "Slot not found"
            };
        }
        await slot.update({
            start_time: start_time !== undefined ? start_time : slot.start_time,
            end_time: end_time !== undefined ? end_time : slot.end_time
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

const deleteSlot = async (slotId) => {
    try {
        const slot = await Slot.findByPk(slotId);
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
    createSlot,
    getAllSlots,
    getSlotById,
    updateSlot,
    deleteSlot
};

