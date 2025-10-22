"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserveControllers_1 = require("../controllers/reserveControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/:id/reserve', authMiddleware_1.protect, reserveControllers_1.reserve);
router.post('/:id/cancel', authMiddleware_1.protect, reserveControllers_1.cancel);
exports.default = router;
//# sourceMappingURL=reserveRoutes.js.map