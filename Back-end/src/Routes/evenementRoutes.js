import { Router } from "express";
import { 
 getEvenements, postEvenement, getEvenementParId,
putEvenement, deleteEvenement, getPropositionsEvenement,
postPropositionEvenement, postChoixFinal} from "../controllers/evenementController.js";
import { postInvitation } from "../controllers/invitationController.js";


const router = Router();

router.get("/", getEvenements);
router.post("/", postEvenement);

router.get("/:id_evenement", getEvenementParId);
router.put("/:id_evenement", putEvenement);
router.delete("/:id_evenement", deleteEvenement);

router.post("/:id_evenement/invitations", postInvitation);

router.get("/:id_evenement/propositions", getPropositionsEvenement);
router.post("/:id_evenement/propositions", postPropositionEvenement);

router.post("/:id_evenement/choix-final", postChoixFinal);

export default router;
