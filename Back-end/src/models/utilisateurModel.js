import { pool } from "../config/db.js";

export const getUtilisateurById = async (id) => {
    const result = await pool.query( //--model 
        `SELECT * 
        FROM utilisateur
        WHERE id = $1`, 
        [id]
    );
    return result.rows[0];
};

export const updateUtilisateurById = async (id, nom, prenom, pseudo, image_profil) => {
            const query = await pool.query(
            `UPDATE utilisateur
            SET  nom = $1, prenom = $2, pseudo = $3, image_profil = $4
            WHERE id = $5
            RETURNING *
            `,
        );

        const values = [nom, prenom, pseudo, image_profil || null, id];
        const result = await pool.query(query, values);
        return result.rows[0];
};