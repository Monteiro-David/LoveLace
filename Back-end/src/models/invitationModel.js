import {pool} from "../config/db.js";

export const creerInvitation = async (idEvenement, idUtilisateur) => {
    const query = `
    INSERT INTO invitation (type, evenement_id, utilisateur_id)
    VALUES ('evenement', $1, $2)
    RETURNING id, statut, type, date_invitation,
              date_limite_reponse, evenement_id, utilisateur_id
              `;

              const values = [idEvenement, idUtilisateur];
              const result = await pool.query(query, values);

              return result.rows[0];

};

export const getInvitationsParUtilisateur = async (idUtilisateur) => {
    const query = `
        SELECT
            id,
            statut,
            type,
            date_invitation,
            date_limite_reponse,
            evenement_id,
            groupe_id,
            utilisateur_id
        FROM invitation
        WHERE utilisateur_id = $1
        AND statut = 'en attente'
        ORDER BY date_invitation DESC
    `;

    const values = [idUtilisateur];
    const result = await pool.query(query, values);

    return result.rows;
};

export const repondreInvitation = async (idInvitation, statut) => {
    const query = `
    UPDATE invitation
    SET statut = $1
    WHERE id = $2
    RETURNING id, statut, type, evenement_id, utilisateur_id
    `;

    const values = [statut, idInvitation];
    const result = await pool.query(query, values);

    return result.rows[0];
};