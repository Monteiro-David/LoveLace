import  express  from "express";
import {pool} from "../config/db.js";

const router = express.Router();

// - `GET /api/utilisateurs/profil` — Récupération du profil connecté 🔴
// - `PUT /api/utilisateurs/profil` — Mise à jour des informations personnelles 🟠

router.get("/profil", async (req, res) => {
  try {
    const { id } = req.params; 

    const result = await pool.query(
        `SELECT * 
        FROM utilisateur
        WHERE id = $1`, 
        [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);
    res.status(500).json({  
      success: false,
      message: "Erreur lors de la récupération des utilisateurs"
    });
  }
});

router.put("/profil", async (req, res) => {
    try {
        const {id } = req.params;
        const { nom, prenom, pseudo, image_profil } = req.body;

        if (!nom || !prenom || !pseudo) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis"
            });
        }
        const query = await pool.query(
            `UPDATE utilisateur
            SET  nom = $1, prenom = $2, pseudo = $3, image_profil = $4
            WHERE id = $5
            RETURNING *
            `,
        );

        const values = [nom, prenom, pseudo, image_profil || null, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }
        res.status(200).json({
            success: true,
            message: "Profil mis à jour avec succès",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Erreur à la base de données:", error);
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Ce pseudo ou cet email est déjà utilisé"
            });
        }
        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du profil"
        });
    }
});

export default router;