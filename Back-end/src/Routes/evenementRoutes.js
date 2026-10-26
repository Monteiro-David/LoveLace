import { Router } from "express";
import { 
 getEvenements, postEvenement } from "../controllers/evenementController.js";

const router = Router();

router.get("/", getEvenements);
router.post("/", postEvenement);

export default router;
