// src/routes/auth.ts
import { Router, Request, Response } from "express";
import User, { IUser } from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const {name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear usuario
    const newUser: IUser = new User({ name, email, password });
    await newUser.save();

    // Respuesta exitosa
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
