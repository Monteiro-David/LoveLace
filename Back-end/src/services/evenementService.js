
import * as evenementModel from "../models/evenementModel.js";
import { ErreurHttp } from "../erreurs.js";


export const listerEvenementsUtilisateur = async (idUtilisateur) => {
    if (!idUtilisateur) {
        throw new ErreurHttp(400, "L'ID de l'utilisateur est requis");
    }
    const evenements = await evenementModel.getEvenementsParUtilisateur(idUtilisateur);
    return evenements;
};


export const creerEvenementService = async (titre, date, lieu, description, categorie, utilisateur_id, groupe_id) => {
    if (!titre || !date || !lieu || !description || !categorie || !utilisateur_id || !groupe_id) {
        throw new ErreurHttp(400, "Tous les champs sont requis");
    }
    if (new Date(date) < new Date()) {
        throw new ErreurHttp(400, "La date de l'événement ne peut pas être dans le passé");
    }
    const evenement = await evenementModel.creerEvenement(titre, date, lieu, description, categorie, utilisateur_id, groupe_id);
    return evenement;
};


export const recupererEvenementParId = async (idEvenement) => {
    if (!idEvenement) {
        throw new ErreurHttp(400, "L'ID de l'événement est requis");
    }
    
    const evenement = await evenementModel.getEvenementParId(idEvenement);
    if (!evenement) {
        throw new ErreurHttp(404, "Événement non trouvé");
    }
    return evenement;
};

export const modifierEvenementService = async (idEvenement, date, lieu, status_final) => {
    if (!idEvenement) {
        throw new ErreurHttp(400, "L'ID de l'événement est requis");
    }
    if (!date || !lieu || !status_final) {
        throw new ErreurHttp(400, "Tous les champs sont requis");
    }
    if (new Date(date) < new Date()) {
        throw new ErreurHttp(400, "La date de l'événement ne peut pas être dans le passé");
    }
    const evenement = await evenementModel.modifierEvenement(idEvenement, date, lieu, status_final);
    return evenement;
};

export const supprimerEvenementService = async (idEvenement) => {
    if (!idEvenement) {
        throw new ErreurHttp(400, "L'ID de l'événement est requis");
    }
    const evenement = await evenementModel. supprimerEvenement(idEvenement);
    return evenement;
};

