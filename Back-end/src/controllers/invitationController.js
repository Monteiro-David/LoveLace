import { creerInvitationService, 
    getInvitationsParUtilisateurService,
repondreInvitationService } from "../services/invitationService.js";

export const postInvitation = async (req, res) => {
    try {
        const idEvenement = req.params.id_evenement;
        const {utilisateur_id} = req.body;

        const invitation = await creerInvitationService(
            idEvenement,
            utilisateur_id
        );

        return res.status(201).json(invitation);
    } catch (error) {
        console.error("Erreur lors de la creation de l'invitation :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }

};

export const getInvitations = async (req, res) => {
    try {
        // Identifiant temporaire pour tester la route.
        const idUtilisateur = 2;

        const invitations = await getInvitationsParUtilisateurService(idUtilisateur);

        return res.status(200).json(invitations);
    } catch (error) {
        console.error("Erreur lors de la récupération des invitations :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};

export const putReponseInvitation = async (req, res) => {
    try {
        const idInvitation = req.params.id_invitation;
        const { statut } = req.body;

        const invitation = await repondreInvitationService(
            idInvitation,
            statut
        );

        return res.status(200).json(invitation);
    } catch (error) {
        console.error("Erreur lors de la réponse à l'invitation :", error);

        return res.status(error.status || 500).json({
            message: error.message
        });
    }
};