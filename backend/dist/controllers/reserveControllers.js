"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.reserve = void 0;
const User_1 = __importDefault(require("../models/User"));
/**
 * Controlador para reservar un hotel
 */
const reserve = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        // Si ya está reservado, evita volver a marcarlo
        if (user.reserved) {
            res.status(400).json({ message: "Ya tienes una reserva activa" });
            return;
        }
        user.reserved = true;
        await user.save();
        res.json({ message: "Hotel reservado exitosamente", user });
    }
    catch (error) {
        console.error("Error en reserva:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.reserve = reserve;
/**
 * Controlador para cancelar reserva
 */
const cancel = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (!user.reserved) {
            res.status(400).json({ message: "No tienes reservas activas" });
            return;
        }
        user.reserved = false;
        await user.save();
        res.json({ message: "Reserva cancelada correctamente", user });
    }
    catch (error) {
        console.error("Error en cancelación:", error);
        res.status(500).json({ message: "Error al cancelar la reserva" });
    }
};
exports.cancel = cancel;
//# sourceMappingURL=reserveControllers.js.map