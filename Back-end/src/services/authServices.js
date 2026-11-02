import * as authModel from "../models/authModel.js"

export const getInscriptionService = async (données) => {
    const {nom, prenom, pseudo, email, mot_de_passe } = données
    if (!nom || !prenom || !pseudo || !email || !mot_de_passe) {
        const error = new Error("Tous les champs sont requis");
        error.status = 400;
        throw error;
    }
    const inscription = await authModel.getInscriptionById(nom, prenom, pseudo, email, mot_de_passe )
    return inscription
}

export const getConnexionById = async (données) => {
    const{email, mot_de_passe} = données
    if (!email || !mot_de_passe) {
        const error = new Error("Email et mot de passe sont requis")
        error.status = 400
        throw error
    }
    const connexion = await authModel.getConnexionById(email,mot_de_passe)
        if (!connexion) {
        const error = new Error("Email ou mot de passe incorrect")
        error.status = 401
        throw error
    }
    return connexion
}