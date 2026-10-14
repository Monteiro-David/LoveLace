import { Router } from "express";
import { pool } from "../config/db.js";
const router = Router();

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
        success: true,
        message : "Connexion a la base de données réussie",
        timestamp: result.rows[0].now
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);
    res.status(500).json({
        success: false,
        message: "Erreur à la base de données",
        error: error.message
    });
  }
});

export default router;