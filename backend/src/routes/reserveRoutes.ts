import { Router } from "express";
import { reserve, cancel } from "../controllers/reserveControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post('/:id/reserve',protect,reserve);
router.post('/:id/cancel',protect,cancel);

export default router;