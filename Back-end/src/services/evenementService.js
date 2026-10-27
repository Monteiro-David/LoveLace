
import {
    getEvenementsParUtilisateur,
    creerEvenement,
    getEvenementParId,
    modifierEvenement,
    supprimerEvenement
} from "../models/evenementModel.js";


export const listerEvenementsUtilisateur = async (idUtilisateur) => {
    const evenements = await getEvenementsParUtilisateur(idUtilisateur);

    return evenements;
};


export const creerEvenementService = async (
    titre,
    date,
    lieu,
    description,
    categorie,
    utilisateur_id,
    groupe_id
) => {
    const evenement = await creerEvenement(
        titre,
        date,
        lieu,
        description,
        categorie,
        utilisateur_id,
        groupe_id
    );

    return evenement;
};

export const recupererEvenementParId = async (idEvenement) => {
    const evenement = await getEvenementParId(idEvenement);

    return evenement;
};

export const modifierEvenementService = async (
    idEvenement,
    date,
    lieu,
    status_final
) => {
    const evenement = await modifierEvenement(
        idEvenement,
        date,
        lieu,
        status_final
    );

    return evenement;
};

export const supprimerEvenementService = async (idEvenement) => {
    const evenement = await supprimerEvenement(idEvenement);

    return evenement;
};

