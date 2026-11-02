import {Router} from "express";
import {getInvitations, putReponseInvitation} from "../controllers/invitationController.js";

const router = Router();

router.get("/", getInvitations);
router.put("/:id_invitation/reponse", putReponseInvitation);

export default router;