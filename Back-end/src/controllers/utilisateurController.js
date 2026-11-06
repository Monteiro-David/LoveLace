import * as utilisateurService from "../services/utilisateurService.js";

export const ProfilController = async (req, res) => {
  try {
    const { id } = req.params; 

    const utilisateur = await utilisateurService.UtilisateurService(id);
    return res.status(200).json({
      success: true,
      data: utilisateur
    });
  } catch (error) {
    console.error("Erreur à la base de données:", error);
    const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
        success: false,
        message: error.message || "Erreur lors de la récupération des utilisateurs"
    });
  }
};

export const modifierProfilController = async (req, res) => {
     try {
        const {id } = req.params;
        const { nom, prenom, pseudo, image_profil } = req.body;

        const modifierUtilisateur = await utilisateurService.modifierUtilisateurService(id, nom, prenom, pseudo, image_profil);
            return res.status(200).json({
            success: true,
            message: "Profil mis à jour avec succès",
            data: modifierUtilisateur
        });
    } catch (error) {
        console.error("Erreur à la base de données:", error);
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Ce pseudo ou cet email est déjà utilisé"
            });
        }
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la mise à jour du profil"
        });
    }
};