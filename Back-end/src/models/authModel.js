import { pool } from "../config/db.js";

const COLONNES_PUBLIQUES = 'id, nom, prenom, pseudo, email, date_creation';

export const inscription = async (nom, prenom, pseudo, email, mot_de_passe) => {
    const query = `INSERT INTO utilisateur (nom, prenom, pseudo, email, mot_de_passe) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING ${COLONNES_PUBLIQUES}
    `;

    const values = [nom, prenom, pseudo, email, mot_de_passe];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const connexionParEmail = async (email) => {
    const query = `SELECT ${COLONNES_PUBLIQUES}, mot_de_passe FROM utilisateur 
    WHERE email = $1`;

    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
};

export const connexionParId = async (id) => {
    const query = `SELECT ${COLONNES_PUBLIQUES} FROM utilisateur
    WHERE id = $1`;
    
    const values =[id];
    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
}

export const deconnexion = async (id) => {
    const query = `DELETE FROM utilisateur WHERE id = $1`;
    const values = [id];
    await pool.query(query, values);
    return { message: "Utilisateur déconnecté avec succès" };
}

export const moi = async (id) => {
    const query = `SELECT ${COLONNES_PUBLIQUES} FROM utilisateur WHERE id = $1`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
}