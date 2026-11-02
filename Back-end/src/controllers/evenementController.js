
import {
    listerEvenementsUtilisateur,
    creerEvenementService,
    recupererEvenementParId,
    modifierEvenementService,
    supprimerEvenementService,
    listerPropositionsParEvenementService,
    creerPropositionService,
    voterPourPropositionService,
    definirChoixFinalService
} from "../services/evenementService.js";

export const getEvenements = async (req, res) => {
    try {
        // Identifiant temporaire pour tester la route.
        const idUtilisateur = 1;

        const evenements = await listerEvenementsUtilisateur(idUtilisateur);

        return res.status(200).json(evenements);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const postEvenement = async (req, res) => {
    try {
        const {
            titre,
            date,
            lieu,
            description,
            categorie,
            groupe_id
        } = req.body;

        // Identifiant temporaire pour tester la création.
        const utilisateur_id = 1;

        const evenement = await creerEvenementService(
            titre,
            date,
            lieu,
            description,
            categorie,
            utilisateur_id,
            groupe_id
        );

        return res.status(201).json(evenement);
    } catch (error) {
        console.error("Erreur lors de la création de l'événement :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const getEvenementParId = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;

        const evenement = await recupererEvenementParId(idEvenement);

        return res.status(200).json(evenement);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const putEvenement = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;
        const { date, lieu, status_final } = req.body;

        const evenement = await modifierEvenementService(
            idEvenement,
            date,
            lieu,
            status_final
        );

        return res.status(200).json(evenement);
    } catch (error) {
        console.error("Erreur lors de la modification de l'événement :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const deleteEvenement = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;

        const evenement = await supprimerEvenementService(idEvenement);

        return res.status(200).json({
            message: "Événement supprimé avec succès",
            id: evenement.id
        });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const getPropositionsEvenement = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;
        const propositions = await listerPropositionsParEvenementService(
            idEvenement
        );
        return res.status(200).json(propositions);
    } catch (error) {
        console.error("Erreur lors de la recuperation des propositions :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const postPropositionEvenement = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;
        const { type, valeur } = req.body;

        const proposition = await creerPropositionService(
            idEvenement,
            type,
            valeur
        );

        return res.status(201).json(proposition);
    } catch (error) {
        console.error("Erreur lors de la création de la proposition :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};


export const postVoteProposition = async (req, res) => {
    try {
        const idProposition = req.params.id_proposition;

        const proposition = await voterPourPropositionService(idProposition);

        return res.status(200).json(proposition);
    } catch (error) {
        console.error("Erreur lors du vote :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};


export const postChoixFinal = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;
        const { status_final } = req.body;

        const evenement = await definirChoixFinalService(
            idEvenement,
            status_final
        );

        return res.status(200).json(evenement);
    } catch (error) {
        console.error("Erreur lors de la validation du choix final :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};