"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reserveRoutes_1 = __importDefault(require("./routes/reserveRoutes"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// Middlewares
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Conexión a MongoDB
(0, db_1.connectDB)();
server.use('/api/auth', userRoutes_1.default);
server.use('/api/reserve', reserveRoutes_1.default);
// Puerto
const PORT = Number(process.env.PORT) || 5000;
// Servidor
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map