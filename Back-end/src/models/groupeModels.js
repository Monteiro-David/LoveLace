import {pool} from "../config/db.js";

export const getListeGroupeById = async (utilisateur_id) => {
    let query = `SELECT * from groupe`;
    let values = [];

    if (utilisateur_id) {
      query = `SELECT g.* 
      FROM groupe g 
      JOIN utilisateur_groupe ug ON g.id = ug.groupe_id 
      WHERE ug.utilisateur_id = $1
      ORDER BY g.date_creation DESC
      `;
      values = [utilisateur_id];
    }else {
      query += ` ORDER BY date_creation DESC`;
    }
    const result = await pool.query(query, values);
    return result.rows;
}

export const CreerGroupeById = async (titre, description) => { 
      const query = `INSERT INTO groupe (titre, description, date_creation)
      VALUES ($1, $2, NOW())
      RETURNING id, titre, description, date_creation
      `;
      const values = [titre, description || null];
      const result = await pool.query(query, values);
      return result.rows[0];
}

export const getDetailGroupeById = async (groupe_id) => {
    const query = `SELECT * FROM groupe WHERE id = $1`;
    const values = [groupe_id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export const ModifierGroupeById = async ( titre, description, groupe_id) => {
      const query = `
      UPDATE groupe 
      SET titre = $1, description = $2 
      WHERE id = $3 
      RETURNING *
      `;
      const values = [titre, description || null, groupe_id];
      const result = await pool.query(query, values);
      return result.rows[0];
}

export const SupprimerGroupeById = async (groupe_id) => {
      const query = `DELETE FROM groupe WHERE id = $1 RETURNING *`;
      const values = [groupe_id];
      const result = await pool.query(query, values);
      return result.rows[0];
}

export const ListeMembreById = async (groupe_id) => {
      const query = `
      SELECT u.id, u.nom, u.prenom, u.pseudo, u.email, ug.role 
      FROM utilisateur u
      JOIN utilisateur_groupe ug ON u.id = ug.utilisateur_id
      WHERE ug.groupe_id = $1
      `;
      const values = [groupe_id]
      const result = await pool.query(query, values);
      return result.rows;
}

export const InviteMembreById = async (utilisateur_id, groupe_id) => {
      const query = `
      INSERT INTO utilisateur_groupe (utilisateur_id, groupe_id) 
      VALUES ($1, $2) 
      RETURNING *
      `;
      const values = [utilisateur_id, groupe_id];
      const result = await pool.query(query, values);
      return result.rows[0];
}

export const ModifierRoleMembreById = async (groupe_id, utilisateur_id, role) => {
        const query = `
        UPDATE utilisateur_groupe 
        SET role = $1 
        WHERE groupe_id = $2 AND utilisateur_id = $3 
        RETURNING *
        `;
        const values = [role, groupe_id, utilisateur_id];
        const result = await pool.query(query, values);
        return result.rows[0];
}

export const QuitterGroupeById =  async (groupe_id, utilisateur_id) => {
        const query = `DELETE FROM utilisateur_groupe WHERE groupe_id = $1 AND utilisateur_id = $2 RETURNING *`;
        const values = [groupe_id, utilisateur_id];
        const result = await pool.query(query, values);
        return result.rows[0];
}