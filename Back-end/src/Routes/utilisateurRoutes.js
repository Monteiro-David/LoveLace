import  express  from "express";
import  {getProfilController } from "../controllers/utilisateurController.js";
import  {updateProfilController } from "../controllers/utilisateurController.js";

const router = express.Router();

// - `GET /api/utilisateurs/profil` — Récupération du profil connecté 🔴
// - `PUT /api/utilisateurs/profil` — Mise à jour des informations personnelles 🟠

router.get("/profil/:id", getProfilController);

router.put("/profil/:id", updateProfilController);

export default router;