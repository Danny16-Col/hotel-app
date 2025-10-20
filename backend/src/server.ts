import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import reserveRoutes from './routes/reserveRoutes';

dotenv.config();

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());

// Conexión a MongoDB
connectDB();

server.use('/api/auth',userRoutes)
server.use('api/reserve',reserveRoutes)
// Puerto
const PORT: number = Number(process.env.PORT) || 5000;

// Servidor
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
