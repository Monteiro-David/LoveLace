
import { pool } from "../config/db.js";

export const getEvenementsParUtilisateur = async (idUtilisateur) => {
    const query = `
        SELECT
            e.id,
            e.titre,
            e.date,
            e.lieu,
            e.description,
            e.categorie,
            e.status_final,
            e.utilisateur_id,
            e.groupe_id
        FROM evenement e
        WHERE e.utilisateur_id = $1
        OR EXISTS (
            SELECT 1
            FROM invitation i
            WHERE i.evenement_id = e.id
            AND i.utilisateur_id = $1
            AND i.type = 'evenement'
            AND i.statut IN ('accepté', 'en attente')
        )
        ORDER BY e.date ASC
    `;

    const values = [idUtilisateur];
    const result = await pool.query(query, values);

    return result.rows;
};
