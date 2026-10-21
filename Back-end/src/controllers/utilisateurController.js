import * as utilisateurService from "../services/utilisateurService.js";

export const getProfilController = async (req, res) => {
  try {
    const { id } = req.params; 

    const utilisateur = await utilisateurService.getUtilisateurService(id);
    return res.status(200).json({
      success: true,
      data: utilisateur
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);
    return res.status(500).json({  
      success: false,
      message: "Erreur lors de la récupération des utilisateurs"
    });
  }
};

export const updateProfilController = async (req, res) => {
     try {
        const {id } = req.params;
        const { nom, prenom, pseudo, image_profil } = req.body;

        const updatedUtilisateur = await utilisateurService.updateUtilisateurService(id, nom, prenom, pseudo, image_profil);
            return res.status(200).json({
            success: true,
            message: "Profil mis à jour avec succès",
            data: updatedUtilisateur
        });
    } catch (error) {
        console.error("Erreur à la base de données:", error);
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Ce pseudo ou cet email est déjà utilisé"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du profil"
        });
    }
};