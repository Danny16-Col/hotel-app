// src/middleware/authMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

// Extender correctamente la interfaz de Request
export interface AuthRequest extends Request {
  user?: any;

}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  // Verificar si el header existe y empieza con 'Bearer'
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      // Buscar el usuario por ID (sin contraseña)
      req.user = await User.findById(decoded.id).select('-password');
      next();
    
    } catch (error) {
      console.error('Error en protect middleware:', error);
      res.status(401).json({ message: 'Token inválido o expirado' });
    
    }
  } else {
    res.status(401).json({ message: 'No autorizado, token no encontrado' });
  
  }

};

