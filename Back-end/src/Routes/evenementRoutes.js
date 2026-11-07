import { Router } from "express";
import { auth } from "../middleware/auth.js";
import * as evenementController from "../controllers/evenementController.js";

const router = Router();

router.use(auth);

router.get("/", evenementController.getEvenements);
router.post("/", evenementController.postEvenement);
router.get("/:id_evenement", evenementController.getEvenementParId);
router.put("/:id_evenement", evenementController.putEvenement);
router.delete("/:id_evenement", evenementController.deleteEvenement);

export default router;
