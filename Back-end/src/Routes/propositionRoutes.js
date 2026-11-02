import {Router} from "express";
import {postVoteProposition} from "../controllers/evenementController.js";

const router = Router();

router.post("/:id_proposition/voter", postVoteProposition);

export default router;