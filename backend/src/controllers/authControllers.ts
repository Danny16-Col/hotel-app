import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";



const generateToken = (id: string | Types.ObjectId): string => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

};

  //  Registro
export const register = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
        res.status(400).json({ message: "Name, email and password are required" });
        return;
      
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        res.status(400).json({ message: "El usuario ya existe" });
        return;
      
        }
        const newUser: IUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({
        message: "Usuario registrado correctamente",
        user: {
              name: newUser.name,              
              email: newUser.email,
            }

        });

    }catch (err) {
        console.error("Error en register:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }

  };
//login
export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({message: 'Invalid credentials'});
              
        }

        const token = generateToken(String(user._id));

        res.status(200).json({
        message: "Inicio de sesión exitoso",
        user: {
        name: user.name,
        email: user.email,
        },token,
        
    });

    } catch (err) {
        console.log(err);
        
    }
};
