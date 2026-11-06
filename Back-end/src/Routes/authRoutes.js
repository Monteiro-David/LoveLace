import express from "express";
import * as authController from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/inscription", authController.inscriptionControle);
router.post("/connexion", authController.connexionControle);
router.get("/moi", auth, authController.moi);
router.post("/deconnexion", authController.deconnexionControle);

export default router;