import * as groupeService from "../services/groupeService.js";

export const getListeGroupeController = async (req, res) => {
      try {
        const { utilisateur_id } = req.query;
       
        const listeGroupe = await groupeService.getListeGroupeService(utilisateur_id);

        return res.status(200).json({ 
            success: true,
            data: listeGroupe
        });
      } catch (error) {
        console.error("Erreur contrôleur de groupe :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message ||  "Erreur lors de la récupération des groupes" });
      }
};

export const CreerGroupeController = async (req, res) => {
      try {
        const { titre, description, utilisateur_id } = req.body;
        
        const nouveauGroupe = await groupeService.CreerGroupeService(titre, description, utilisateur_id);
        return res.status(201).json({
            success: true,
            message: "Groupe créé avec succès",
            data: nouveauGroupe
        });
    
        } catch (error) {
        console.error("Erreur du contrôleur de création du groupe :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message ||  "Erreur lors de la création du groupe" });
      } 
};

export const getDetailGroupeController = async (req, res) => {
     try {
        const { groupe_id } = req.params;
        const detailGroupe = await groupeService.getDetailGroupeService(groupe_id);
        return res.status(200).json({
          success: true,
          data: detailGroupe
        });
      } catch (error) {
        console.error("Erreur de base de données :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la récupération du groupe" });
      }
}

export const ModifierGroupeController = async (req,res) => {
      try {
        const { groupe_id } = req.params;
        const { titre, description } = req.body
        const modifGroupe = await groupeService.ModifierGroupeService(groupe_id, titre, description);

        return res.status(200).json({
          success: true,
          message: "Groupe modifié avec succès",
          data: modifGroupe
        });
        } catch (error) {
        console.error("Erreur contrôle de la modification du groupe :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la modification du groupe" });
      }
}

export const SupprimerGroupeController = async (req, res) => {
      try {
        const { groupe_id } = req.params;
        const groupeSupprimer = await groupeService.SupprimerGroupeSevice(groupe_id);

        return res.status(200).json({
          success: true,
          message: "Groupe supprimé avec succès",
          data: groupeSupprimer
        });
      } catch (error) {
        console.error("Erreur de base de données :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la suppression du groupe" });
      }
}

export const ListeMembreController = async (req, res) => {
      try {
        const { groupe_id } = req.params;
        const membres = await groupeService.ListeMembreService(groupe_id)
    
        return res.status(200).json({
            success: true,
            data: membres
        });
      } catch (error) {
        console.error("Erreur contrôleur membres du groupe :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Erreur lors de la récupération des membres du groupe" });
      }
}

export const InviteMembreController = async (req, res) => {
    try {
        const { groupe_id} = req.params;
        const { utilisateur_id } = req.body;
        const invitation = await groupeService.InviteMembreService(groupe_id, utilisateur_id)  
    
        return res.status(201).json({
          success: true,
          message: "Invitation envoyée avec succès",
          data: invitation
        });
    } catch (error) {
        console.error("Erreur contrôleur invitation groupe:", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success : false,
            message: error.message || "Erreur lors de l'envoi de l'invitation" 
        });
    }
}

export const ModifierroleController = async (req, res) => {
    try {
        const { groupe_id, utilisateur_id } = req.params;
        const { role } = req.body;
        const membre = await groupeService.ModifierRoleMembreService(groupe_id, utilisateur_id, role)

        return res.status(200).json({
            success: true,
            message: "Rôle de l'utilisateur mis à jour avec succès",
            data: membre
        });
    } catch (error) {
        console.error("Erreur contrôleur mise à jour rôle membre :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la mise à jour du rôle de l'utilisateur" });
    }
}

export const QuitterGroupeController = async (req, res) => {
    try {
        const { groupe_id, utilisateur_id } = req.params;
        const supprime = await groupeService.QuitterGroupeService(groupe_id, utilisateur_id)

        return res.status(200).json({
            success: true,
            message: "Membre supprimé du groupe avec succès",
            data: supprime
        });
    } catch (error) {
        console.error("Erreur contrôleur suppression membre du groupe :", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la suppression du membre du groupe" });
    } 
}