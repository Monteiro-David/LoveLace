import { express } from "express";
import pool from "../db.js";

// - `GET /api/groupes` — Lister les groupes de l'utilisateur 🔴
// - `POST /api/groupes` — Créer un nouveau groupe 🔴
// - `GET /api/groupes/:id_groupe` — Consulter les détails d'un groupe 🔴
// - `PUT /api/groupes/:id_groupe` — Modifier un groupe 🔵
// - `DELETE /api/groupes/:id_groupe` — Supprimer un groupe 🔵
// - `GET /api/groupes/:id_groupe/membres` — Lister les membres du groupe 🟠
// - `POST /api/groupes/:id_groupe/invitations` — Inviter un utilisateur à rejoindre le groupe 🟠
// - `PUT /api/groupes/:id_groupe/membres/:id_utilisateur` — Modifier le rôle d'un membre 🔵(*admin / membre*)
// - `DELETE /api/groupes/:id_groupe/membres/:id_utilisateur` — Retirer un membre ou quitter le groupe🔵

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { utilisateur_id } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
    let query = `SELECT * from groupe`;
    let values = [];

    if (utilisateur_id) {
      query = `SELECT g.* 
      FROM groupe g 
      JOIN utilisateur_groupe ug ON g.id = ug.groupe_id 
      WHERE ug.utilisateur_id = $1
      ORDER BY g.date_creation DESC
      `;
      values = [utilisateur_id];
    }else {
      query += ` ORDER BY date_creation DESC`;
    }

    const result = await pool.query(query, values);
    res.status(200).json({ 
        success: true,
        data: result.rows
    });
  } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des groupes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { titre, description, utilisateur_id } = req.body;

    if (!titre || !utilisateur_id) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis"
      });
    }
    const query = `INSERT INTO groupe (titre, description, date_creation)
    VALUES ($1, $2, NOW())
    RETURNING id, titre, description, date_creation
    `;
    const values = [titre, description];
    const result = await pool.query(query, values);
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });

    } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la création du groupe" });
  } 
});

router.get("/:id_groupe", async (req, res) => {
  try {
    const { id_groupe } = req.params;
    const query = `SELECT * FROM groupe WHERE id = $1`;
    const values = [id_groupe];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Groupe non trouvé"
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du groupe" });
  }
});

router.put("/:id_groupe", async (req, res) => {
  try {
    const { id_groupe } = req.params;
    const { titre, description } = req.body;

    if (!titre ) {
      return res.status(400).json({
        success: false,
        message: "Le titre est requis"
      });
    }
    const query = `
    UPDATE groupe 
    SET titre = $1, description = $2 
    WHERE id = $3 
    RETURNING *
    `;
    const values = [titre, description, id_groupe];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Groupe non trouvé"
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
    } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du groupe" });
  }
});

router.delete("/:id_groupe", async (req, res) => {
  try {
    const { id_groupe } = req.params;
    const query = `DELETE FROM groupe WHERE id = $1 RETURNING *`;
    const values = [id_groupe];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Groupe non trouvé"
        });
    }
    res.status(200).json({
      success: true,
      message: "Groupe supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du groupe" });
  }
});

router.get("/:id_groupe/membres", async (req, res) => {
  try {
    const { id_groupe } = req.params;
    const result = await pool.query(
      `SELECT u.id, u.nom, u.prenom, u.pseudo, u.email, ug.role 
      FROM utilisateur u
      JOIN utilisateur_groupe ug ON u.id = ug.utilisateur_id
      WHERE ug.groupe_id = $1`,
      [id_groupe]
    );

    res.status(200).json({
        success: true,
        data: result.rows
    });
  } catch (error) {
    console.error("Erreur de base de données :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des membres du groupe" });
  }
});

router.put("/:id_groupe/membres/:id_utilisateur", async (req, res) => {
    try {
        const { id_groupe, id_utilisateur } = req.params;
        const { role } = req.body;

        if (!role ||!["admin", "membre"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Rôle invalide. Les rôles valides sont 'admin' et 'membre'."
            });
        }

        const query = `
        UPDATE utilisateur_groupe 
        SET role = $1 
        WHERE groupe_id = $2 AND utilisateur_id = $3 
        RETURNING *
        `;
        const values = [role, id_groupe, id_utilisateur];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Association groupe-utilisateur non trouvée"
            });
        }
        res.status(200).json({
            success: true,
            message: "Rôle de l'utilisateur mis à jour avec succès",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Erreur de base de données :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du rôle de l'utilisateur" });
    }
});

router.delete("/:id_groupe/membres/:id_utilisateur", async (req, res) => {
    try {
        const { id_groupe, id_utilisateur } = req.params;
        const query = `DELETE FROM utilisateur_groupe WHERE groupe_id = $1 AND utilisateur_id = $2 RETURNING *`;
        const values = [id_groupe, id_utilisateur];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Membre non trouvé dans le groupe"
            });
        }
        res.status(200).json({
            success: true,
            message: "Membre supprimé du groupe avec succès"
        });
    } catch (error) {
        console.error("Erreur de base de données :", error);
        res.status(500).json({ error: "Erreur lors de la suppression du membre du groupe" });
    }
});
export default router;