import { Router } from "express";
import { 
 getEvenements, postEvenement, getEvenementParId,
putEvenement, deleteEvenement } from "../controllers/evenementController.js";

const router = Router();

router.get("/", getEvenements);
router.post("/", postEvenement);
router.get("/:id_evenement", getEvenementParId);
router.put("/:id_evenement", putEvenement);
router.delete("/:id_evenement", deleteEvenement);

export default router;
