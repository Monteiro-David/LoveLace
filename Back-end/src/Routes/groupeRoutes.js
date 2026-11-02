import express from "express";
import {getListeGroupeController, CreerGroupeController, getDetailGroupeController, ModifierGroupeController, SupprimerGroupeController, ListeMembreController, InviteMembreController, ModifierroleController, QuitterGroupeController} from "../controllers/groupeController.js";

const router = express.Router();

router.get("/", getListeGroupeController);
router.post("/", CreerGroupeController);
router.get("/:id_groupe", getDetailGroupeController);
router.put("/:id_groupe", ModifierGroupeController);
router.delete("/:id_groupe", SupprimerGroupeController);
router.get("/:id_groupe/membres", ListeMembreController);
router.post("/:id_groupe/invitations", InviteMembreController);
router.put("/:id_groupe/membres/:id_utilisateur", ModifierroleController);
router.delete("/:id_groupe/membres/:id_utilisateur", QuitterGroupeController);
export default router;