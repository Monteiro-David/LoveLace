import bcrypt from 'bcryptjs';
import * as authModel from "../models/authModel.js"

export const inscriptionService = async (données) => {
    const {nom, prenom, pseudo, email, mot_de_passe } = données;
    if (!nom || !prenom || !pseudo || !email || !mot_de_passe) {
        const error = new Error("Tous les champs sont requis");
        error.status = 400;
        throw error;
    };

    const dejaUtiliser = await authModel.connexionParEmail(email);
    if (dejaUtiliser) {
        const error = new Error("Cet email est déjà utilisé");
        error.status = 409;
        throw error;
    };

    const motDePasseHache = await bcrypt.hash(mot_de_passe, 10);
    const inscription = await authModel.inscription(nom, prenom, pseudo, email, motDePasseHache );
    return inscription;
};

export const connexionService = async (données) => {
    const{email, mot_de_passe} = données
    if (!email || !mot_de_passe) {
        const error = new Error("Email et mot de passe sont requis")
        error.status = 400
        throw error
    };
    const utilisateur = await authModel.connexionParEmail(email,mot_de_passe)
    if (!utilisateur) {
        const error = new Error("Email ou mot de passe incorrect")
        error.status = 401
        throw error
    };
    const motDEpasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDEpasseValide) {
        const error = new Error("Email ou mot de passe incorrect")
        error.status = 401;
        throw error;
    }
    const {mot_de_passe: _, ...utilisateurSecurise} = utilisateur;
    return utilisateurSecurise
}

export const deconnexionService = async (id) => {
    if (!id) {
        const error = new Error("ID de l'utilisateur requis");
        error.status = 400;
        throw error;
    }

}    