import * as groupeModel from "../models/groupeModels.js";

export const getListeGroupeService = async (utilisateur_id) => {
    const listeGroupe = await groupeModel.getListeGroupeById(utilisateur_id);
    return listeGroupe;
};

export const CreerGroupeService = async (titre, description, utilisateur_id) => {
    if (!titre || !utilisateur_id) {
        const error = new Error("Tous les champs sont requis");
        error.status = 400;
        throw error;
    }
    
    const nouveauGroupe = await groupeModel.CreerGroupeById(titre, description);
    return nouveauGroupe;
};

export const getDetailGroupeService = async (groupe_id) => {
    const detailGroupe = await groupeModel.getDetailGroupeById(groupe_id);
    if (!detailGroupe) {
        const error = new Error("Groupe non trouvé");
        error.status = 404;
        throw error;
    }
    return detailGroupe;
};

export const ModifierGroupeService = async (titre, description, groupe_id) => {
    if (!titre) {
        const error = new Error("Le titre est requis");
        error.status = 400;
        throw error;
    }
    const groupeModifier = await groupeModel.ModifierGroupeById(groupe_id, titre, description);
    if (!groupeModifier) {
        const error = new Error("Groupe non trouvé")
        error.status = 404;
        throw error;
    }

    return groupeModifier;
};

export const SupprimerGroupeSevice = async (groupe_id) => {
    const groupeSupprimer = await groupeModel.SupprimerGroupeById(groupe_id);
    if (!groupeSupprimer) {
        const error = new Error("Groupe non trouvé");
        error.status = 404
        throw error;
    }
    return groupeSupprimer
};

export const ListeMembreService = async (groupe_id) => {
    const membres = await groupeModel.ListeMembreById(groupe_id);
    if (!membres || membres.length === 0) {
        const error = new Error("Aucun membre trouvé pour ce groupe");
        error.status = 404
        throw error;
    }
    return membres;
};

export const InviteMembreService = async (groupe_id, utilisateur_id) => {
    if (!utilisateur_id) {
        const error = new Error("L'identifiant de l'utilisateur est requis");
        error.status = 400;
        throw error;
    }
    
    try {
        const invitation = await groupeModel.InviteMembreById(utilisateur_id, groupe_id );
        return invitation
        
    } catch (error) {
        if (error.code === '23505') {
            const dejaMembre = new Error("Cet utilisateur est déjà membre de ce groupe");
            dejaMembre.status = 409;
            throw dejaMembre;
        }
        throw error;
    }
};

export const ModifierRoleMembreService = async (groupe_id, utilisateur_id, role) => {
    if (!role ||!["admin", "membre"].includes(role)) {
        const error = new Error("Rôle invalide. Les rôles valides sont 'admin' et 'membre'.");
        error.status = 400;
        throw error;
    }
    const roleMembre = await groupeModel.ModifierRoleMembreById(groupe_id, utilisateur_id, role);
    if (!roleMembre) {
        const error = new Error("Association groupe-utilisateur non trouvée");
        error.status = 404
        throw error;
    }
    return roleMembre;
}

export const QuitterGroupeService = async (groupe_id, utilisateur_id) => {
    const supprime = await groupeModel.QuitterGroupeById(groupe_id, utilisateur_id);    
    if (!supprime) {
        const error = new Error("Membre non trouvé dans le groupe");
        error.status = 404;
        throw error;
    }
    return supprime;
}