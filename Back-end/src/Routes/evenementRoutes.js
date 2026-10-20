import {Router} from "express";
import {pool} from "../config/db.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        // identifiant temporaire pour tester la route
        const idUtilisateur = 1;

        const resultats = await pool.query(
            `SELECT
            id,
            titre,
            date,
            lieu,
            description,
            categorie,
            status_final,
            groupe_id
            FROM Evenement
            WHERE utilisateur_id = $1`,
            [idUtilisateur]
        );
        res.status(200).json(resultats.rows);
    } catch (error) {
        console.error("Erreur lors de la recuperation des evenements :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la recuperation des evenements"
        });
    }
});

export default router;