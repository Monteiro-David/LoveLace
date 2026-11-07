import  express  from "express";
import * as utilisateurController from "../controllers/utilisateurController.js";
;

const router = express.Router();

router.get("/profil/:id", utilisateurController.ProfilController);
router.put("/profil/:id", utilisateurController.modifierProfilController);

export default router;