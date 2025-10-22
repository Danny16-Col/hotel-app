"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id.toString() }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
//  Registro
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email and password are required" });
            return;
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "El usuario ya existe" });
            return;
        }
        const newUser = new User_1.default({ name, email, password });
        await newUser.save();
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                name: newUser.name,
                email: newUser.email,
            }
        });
    }
    catch (err) {
        console.error("Error en register:", err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.register = register;
//login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(String(user._id));
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                name: user.name,
                email: user.email,
            }, token,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.login = login;
//# sourceMappingURL=authControllers.js.map