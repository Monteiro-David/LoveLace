import { pool } from "../config/db.js";

export const getInscriptionById = async (nom, prenom, pseudo, email, mot_de_passe) => {
    const query = `INSERT INTO utilisateur (nom, prenom, pseudo, email, mot_de_passe) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nom, prenom, pseudo, email, date_creation
    `;

    const values = [nom, prenom, pseudo, email, mot_de_passe];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getConnexionById = async (email, mot_de_passe) => {
    const query = `SELECT * FROM utilisateur 
    WHERE email = $1 AND mot_de_passe = $2`;

    const values = [email, mot_de_passe];
    const result = await pool.query(query, values);
    return result.rows[0];
};