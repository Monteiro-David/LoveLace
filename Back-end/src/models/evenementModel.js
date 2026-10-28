
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
        RETURNING id, titre, date, lieu, description, categorie,
                  status_final, utilisateur_id, groupe_id
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

export const getEvenementParId = async (idEvenement) => {
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
        WHERE e.id = $1
    `;

    const values = [idEvenement];
    const result = await pool.query(query, values);

    return result.rows[0];
    
};

export const modifierEvenement = async (
    idEvenement,
    date,
    lieu,
    status_final
) => {
    const query = `
        UPDATE evenement
        SET date = $1,
            lieu = $2,
            status_final = $3
        WHERE id = $4
        RETURNING id, titre, date, lieu, description,
                  categorie, status_final, utilisateur_id, groupe_id
    `;

    const values = [
        date,
        lieu,
        status_final,
        idEvenement
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const supprimerEvenement = async (idEvenement) => {
    const query = `
        DELETE FROM evenement
        WHERE id = $1
        RETURNING id
    `;

    const values = [idEvenement];
    const result = await pool.query(query, values);

    return result.rows[0];
};

