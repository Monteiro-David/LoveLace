
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

export const getPropositionsParEvenement = async (idEvenement) => {
    const query = `
        SELECT
            id,
            type,
            valeur,
            nb_votes,
            evenement_id
        FROM proposition_vote
        WHERE evenement_id = $1
        ORDER BY id ASC
    `;

    const values = [idEvenement];
    const result = await pool.query(query, values);

    return result.rows;
};


export const creerProposition = async (idEvenement, type, valeur) => {
    const query = `
        INSERT INTO proposition_vote (evenement_id, type, valeur)
        VALUES ($1, $2, $3)
        RETURNING id, type, valeur, nb_votes, evenement_id
    `;

    const values = [idEvenement, type, valeur];
    const result = await pool.query(query, values);

    return result.rows[0];
};


export const voterPourProposition = async (idProposition) => {
    const query = `
        UPDATE proposition_vote
        SET nb_votes = nb_votes + 1
        WHERE id = $1
        RETURNING id, type, valeur, nb_votes, evenement_id
    `;

    const values = [idProposition];
    const result = await pool.query(query, values);

    return result.rows[0];
};


export const definirChoixFinal = async (idEvenement, statusFinal) => {
    const query = `
        UPDATE evenement
        SET status_final = $1
        WHERE id = $2
        RETURNING id, titre, date, lieu, status_final,
                  utilisateur_id, groupe_id
    `;

    const values = [statusFinal, idEvenement];
    const result = await pool.query(query, values);

    return result.rows[0];
};