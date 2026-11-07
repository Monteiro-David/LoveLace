import * as utilisateurModel from "../models/utilisateurModel.js";

export const UtilisateurService = async (id) => {
    const utilisateur = await utilisateurModel.getUtilisateurById(id);
    if (!utilisateur) {
        const error = new Error("Utilisateur non trouvé");
        error.status = 404;
        throw error;
    }
    return utilisateur;
};

export const modifierUtilisateurService = async (id, nom, prenom, pseudo, image_profil) => {
    if (!nom || !prenom || !pseudo) {
        const error = new Error("Tous les champs sont requis");
        error.status = 400;
        throw error;
    }
    const modifiedUtilisateur = await utilisateurModel.getUtilisateurById(id);
    if (!modifiedUtilisateur) {
        const error = new Error("Utilisateur non trouvé");
        error.status = 404;
        throw error;
    }
    return modifiedUtilisateur;
};
       