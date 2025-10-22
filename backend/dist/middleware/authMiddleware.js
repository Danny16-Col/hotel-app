"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
// src/middleware/authMiddleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    // Verificar si el header existe y empieza con 'Bearer'
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verificar token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Buscar el usuario por ID (sin contraseña)
            req.user = await User_1.default.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            console.error('Error en protect middleware:', error);
            res.status(401).json({ message: 'Token inválido o expirado' });
        }
    }
    else {
        res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map