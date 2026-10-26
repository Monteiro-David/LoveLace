import * as authServices from "../services/authServices.js";

export const getauthinscriptionControle = async (req, res) => {
      try {
        const inscription = await authServices.getInscriptionService(req.body); 
    
    
        return res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès",
            data: inscription
        });
      } catch (error) {
        console.error("Erreur de contrôle d'inscription:", error);
    
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: "L'email ou le pseudo est déjà utilisé"
            });
        }
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de l'inscription "
        });
      }
    
}

export const getauthConnexionControle = async (req, res) => {
      try {
        const {email, mot_de_passe } = req.body
        const connexion = await authServices.getConnexionById(email, mot_de_passe);

    
        return res.status(200).json({
          success: true,
          message: "Connexion réussie",
          data: connexion
        });
      } catch (error) {
        console.error("Erreur à la base de données:", error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ 
            success: false,
            message: error.message || "Erreur lors de la connexion"
        });
      }
}