
import {
    getEvenementsParUtilisateur,
    creerEvenement,
    getEvenementParId,
    modifierEvenement,
    supprimerEvenement,
    getPropositionsParEvenement,
    creerProposition,
    voterPourProposition,
    definirChoixFinal
} from "../models/evenementModel.js";

export const listerEvenementsUtilisateur = async (idUtilisateur) => {
    return await getEvenementsParUtilisateur(idUtilisateur);
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
    if (!titre || !date || !utilisateur_id) {
        const error = new Error("Le titre, la date et l'utilisateur sont requis");
        error.status = 400;
        throw error;
    }

    return await creerEvenement(
        titre,
        date,
        lieu,
        description,
        categorie,
        utilisateur_id,
        groupe_id
    );
};

export const recupererEvenementParId = async (idEvenement) => {
    const evenement = await getEvenementParId(idEvenement);

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

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

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

    return evenement;
};

export const supprimerEvenementService = async (idEvenement) => {
    const evenement = await supprimerEvenement(idEvenement);

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

    return evenement;
};

export const listerPropositionsParEvenementService = async (idEvenement) => {
    if (!idEvenement) {
        const error = new Error("L'identifiant de l'événement est requis");
        error.status = 400;
        throw error;
    }

    const evenement = await getEvenementParId(idEvenement);

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

    return await getPropositionsParEvenement(idEvenement);
};


export const creerPropositionService = async (idEvenement, type, valeur) => {
    if (!idEvenement || !["date", "lieu"].includes(type) || !valeur) {
        const error = new Error("Un événement, un type (date ou lieu) et une valeur sont requis");
        error.status = 400;
        throw error;
    }

    const evenement = await getEvenementParId(idEvenement);

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

    return await creerProposition(idEvenement, type, valeur);
};

export const voterPourPropositionService = async (idProposition) => {
    if (!idProposition) {
        const error = new Error("L'identifiant de la proposition est requis");
        error.status = 400;
        throw error;
    }

    const proposition = await voterPourProposition(idProposition);

    if (!proposition) {
        const error = new Error("Proposition introuvable");
        error.status = 404;
        throw error;
    }

    return proposition;
};


export const definirChoixFinalService = async (idEvenement, statusFinal) => {
    const statutsAutorises = ["confirmé", "annulé"];

    if (!idEvenement || !statutsAutorises.includes(statusFinal)) {
        const error = new Error("Un identifiant d'événement et un statut confirmé ou annulé sont requis");
        error.status = 400;
        throw error;
    }

    const evenement = await definirChoixFinal(idEvenement, statusFinal);

    if (!evenement) {
        const error = new Error("Événement introuvable");
        error.status = 404;
        throw error;
    }

    return evenement;
};