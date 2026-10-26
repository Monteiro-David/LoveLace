
import { getEvenementsParUtilisateur } from "../models/evenementModel.js";
import { creerEvenement } from "../models/evenementCreationModel.js";


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

