import express from "express";
import {getauthConnexionControle, getauthinscriptionControle} from "../controllers/authController.js";

const router = express.Router();

// - `POST /api/auth/inscription` — Création d'un nouveau compte 🔵
// - `POST /api/auth/connexion` — Authentification et génération du token JWT 🔵

router.post("/inscription", getauthinscriptionControle);

router.post("/connexion", getauthConnexionControle)

export default router;