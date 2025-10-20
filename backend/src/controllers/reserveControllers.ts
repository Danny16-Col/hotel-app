import { Request, Response } from "express";
import User, { IUser } from "../models/User";

/**
 * Controlador para reservar un hotel
 */
export const reserve = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);

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
  } catch (error) {
    console.error("Error en reserva:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Controlador para cancelar reserva
 */
export const cancel = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);

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
  } catch (error) {
    console.error("Error en cancelación:", error);
    res.status(500).json({ message: "Error al cancelar la reserva" });
  }
};
