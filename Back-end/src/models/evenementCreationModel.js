
import { pool } from "../config/db.js";

export const creerEvenement = async (
    titre,
    date,
    lieu,
    description,
    categorie,
    utilisateur_id,
    groupe_id
) => {
    const query = `
        INSERT INTO evenement
            (titre, date, lieu, description, categorie, utilisateur_id, groupe_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, titre, date, lieu, description, categorie, status_final, utilisateur_id, groupe_id
    `;

    const values = [
        titre,
        date,
        lieu,
        description,
        categorie,
        utilisateur_id,
        groupe_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};
