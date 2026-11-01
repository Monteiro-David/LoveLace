import {creerInvitation, getInvitationsParUtilisateur,
    repondreInvitation
} from "../models/invitationModel.js";

export const creerInvitationService = async (idEvenement, idUtilisateur) => {
    if (!idEvenement || !idUtilisateur) {
        const error = new Error("L'evenement et l'utilisateur sont requis");
        error.status =400;
        throw error;
    }
    return await creerInvitation(idEvenement, idUtilisateur);
};

export const getInvitationsParUtilisateurService = async (idUtilisateur) => {
    if (!idUtilisateur) {
        const error = new Error("L'identifiant de l'utilisateur est requis");
        error.status = 400;
        throw error;
    }

    return await getInvitationsParUtilisateur(idUtilisateur);
};

export const repondreInvitationService = async (idInvitation, statut) => {
    if (!idInvitation || !["accepté", "refusé"].includes(statut)) {
        const error = new Error("Un identifiant valide et un statut accepté ou refusé sont requis");
        error.status = 400;
        throw error;
    }

    const invitation = await repondreInvitation(idInvitation, statut);

    if (!invitation) {
        const error = new Error("Invitation introuvable");
        error.status = 404;
        throw error;
    }

    return invitation;
};

