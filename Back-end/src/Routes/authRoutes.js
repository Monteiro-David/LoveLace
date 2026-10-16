import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// - `POST /api/auth/inscription` — Création d'un nouveau compte 🔵
// - `POST /api/auth/connexion` — Authentification et génération du token JWT 🔵

router.post("/inscription", async (req, res) => {
  try {
    const { nom, prenom, pseudo, email, mot_de_passe } = req.body; 

    if (!nom || !prenom || !pseudo || !email || !mot_de_passe) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis"
      });
    }
    const query = `INSERT INTO utilisateur (nom, prenom, pseudo, email, mot_de_passe) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nom, prenom, pseudo, email, date_creation
    `;
    const values = [nom, prenom, pseudo, email, mot_de_passe];
    const result = await pool.query(query, values);

    res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: result.rows[0]
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);

    if (error.code === '23505') {
        return res.status(409).json({
            success: false,
            message: "L'email ou le pseudo est déjà utilisé"
        });
    }
    
    res.status(500).json({
        success: false,
        message: "Erreur lors de l'inscription "
    });
  }
});

router.post("/connexion", async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    if (!email || !mot_de_passe) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe sont requis"
      });
    }

    const query = `SELECT * FROM utilisateur WHERE email = $1 AND mot_de_passe = $2`;
    const values = [email, mot_de_passe];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion"
    });
  }
});

export default router;