import  express  from "express";
import  {getProfilController } from "../controllers/utilisateurController.js";
import  {updateProfilController } from "../controllers/utilisateurController.js";

const router = express.Router();

router.get("/profil/:id", getProfilController);
router.put("/profil/:id", updateProfilController);

export default router;