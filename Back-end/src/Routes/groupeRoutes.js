import express from "express";
import * as groupeController from "../controllers/groupeController.js";
import { auth } from "../middlewares/auth.js";
import { estAdmin, estMembre, estAdminOuNon } from "../middlewares/droitsGroupe.js";

const router = express.Router();

router.use(auth);

router.get("/", groupeController.ListeGroupeController);
router.post("/", groupeController.CreerGroupeController);
router.get("/:groupe_id", estMembre, groupeController.DetailGroupeController);
router.put("/:groupe_id", estAdmin, groupeController.ModifierGroupeController);
router.delete("/:groupe_id", estAdmin, groupeController.SupprimerGroupeController);
router.get("/:groupe_id/membres", estMembre, groupeController.ListeMembreController);
router.post("/:groupe_id/invitations", estAdmin, groupeController.InviteMembreController);
router.put("/:groupe_id/membres/:utilisateur_id", estAdmin, groupeController.ModifierroleController);
router.delete("/:groupe_id/membres/:utilisateur_id", estAdminOuNon, groupeController.QuitterGroupeController);

export default router;