import express from "express";
import * as groupeController from "../controllers/groupeController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);

router.get("/", groupeController.ListeGroupeController);
router.post("/", groupeController.CreerGroupeController);
router.get("/:groupe_id", groupeController.DetailGroupeController);
router.put("/:groupe_id", groupeController.ModifierGroupeController);
router.delete("/:groupe_id", groupeController.SupprimerGroupeController);
router.get("/:groupe_id/membres", groupeController.ListeMembreController);
router.post("/:groupe_id/invitations", groupeController.InviteMembreController);
router.put("/:groupe_id/membres/:utilisateur_id", groupeController.ModifierroleController);
router.delete("/:groupe_id/membres/:utilisateur_id", groupeController.QuitterGroupeController);
export default router;