import bcrypt from 'bcryptjs';
import * as authModel from "../models/authModel.js"
import { ErreurHttp } from "../erreurs.js";

export const inscriptionService = async (données) => {
    const {nom, prenom, pseudo, email, mot_de_passe } = données;
    if (!nom || !prenom || !pseudo || !email || !mot_de_passe) {
        throw new ErreurHttp(400, "Tous les champs sont requis");
    };

    const dejaUtiliser = await authModel.connexionParEmail(email);
    if (dejaUtiliser) {
        throw new ErreurHttp(409, "Cet email est déjà utilisé");
    };

    const motDePasseHache = await bcrypt.hash(mot_de_passe, 10);
    const inscription = await authModel.inscription(nom, prenom, pseudo, email, motDePasseHache );
    return inscription;
};

export const connexionService = async (données) => {
    const{email, mot_de_passe} = données
    if (!email || !mot_de_passe) {
        throw new ErreurHttp(400, "Email et mot de passe sont requis")
    };
    const utilisateur = await authModel.connexionParEmail(email,mot_de_passe)
    if (!utilisateur) {
        throw new ErreurHttp(401, "Email ou mot de passe incorrect")
    };
    const motDEpasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDEpasseValide) {
        throw new ErreurHttp(401, "Email ou mot de passe incorrect")
    };
    const {mot_de_passe: _, ...utilisateurSecurise} = utilisateur;
    return utilisateurSecurise
}

export const moiService = async (id) => {
    if (!id) {
        throw new ErreurHttp(400, "ID de l'utilisateur requis");
    }
    const utilisateur = await authModel.moi(id);
    if (!utilisateur) {
        throw new ErreurHttp(404, "Utilisateur non trouvé");
    }
    return utilisateur;
}

export const deconnexionService = async (id) => {
    if (!id) {
        throw new ErreurHttp(400, "ID de l'utilisateur requis");
    }
    const utilisateur = await authModel.deconnexion(id);
    if (!utilisateur) {
        throw new ErreurHttp(404, "Utilisateur non trouvé");
    }
    return utilisateur;
}    