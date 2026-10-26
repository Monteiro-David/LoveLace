
import {
    listerEvenementsUtilisateur,
    creerEvenementService
} from "../services/evenementService.js";

export const getEvenements = async (req, res) => {
    try {
        // Identifiant temporaire pour tester la route.
        const idUtilisateur = 1;

        const evenements = await listerEvenementsUtilisateur(idUtilisateur);

        return res.status(200).json(evenements);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des événements"
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

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la création de l'événement"
        });
    }
};

