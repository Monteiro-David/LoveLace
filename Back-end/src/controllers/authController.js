import * as authServices from "../services/authServices.js";


export const validerInscription = (body) => {
  const erreur = {};
  const champs = ['nom', 'prenom', 'pseudo', 'email', 'mot_de_passe'];

  for (const champ of champs) {
    if (!body[champ]) {
      erreur[champ] = `Le ${champ} est requis.`;
    } else if (typeof body[champ] !== 'string') {
      erreur[champ] = `Le ${champ} doit être une chaîne de caractères.`;
    }else if (body[champ].trim() === '') {
      erreur[champ] = `Le ${champ} ne peut pas être vide.`;
    }
  }

  if (body.nom && body.nom.length < 2) {
    erreur.nom = "Le nom doit contenir au moins 2 caractères.";
  }

  if (body.prenom && body.prenom.length < 2) {
    erreur.prenom = "Le prénom doit contenir au moins 2 caractères.";
  }

  if (body.mot_de_passe && body.mot_de_passe.length < 8) {
    erreur.mot_de_passe = "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (body.pseudo && body.pseudo.length < 3) {
    erreur.pseudo = "Le pseudo doit contenir au moins 3 caractères.";
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    erreur.email = "L'email n'est pas valide.";
  }
  return erreur;
}

export const inscriptionControle = async (req, res) => {
      try {
        const erreurs = validerInscription(req.body);
        if (Object.keys(erreurs).length > 0) {
          return res.status(422).json({
            success: false,
            message: "Données d'inscription invalides",
            erreurs: erreurs
          });
        };

        const donneesInscription = {
          ...req.body,
          email: req.body.email.trim().toLowerCase(),
        }

        const inscription = await authServices.inscriptionService({ donneesInscription }); 
    
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
    
};

export const connexionControle = async (req, res) => {
      try {
        const {email, mot_de_passe } = req.body
        const connexion = await authServices.connexionService({email, mot_de_passe});

    
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