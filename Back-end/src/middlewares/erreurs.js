import { ErreurHttp } from "../erreurs.js";

export function gestionErreurs(err, req, res, next){
    if (err instanceof ErreurHttp){
        return res.status(err.status).json({ message: err.message, erreur: err.details });
    }
    if (err.type === 'entity.parse.failed'){
        return res.status(400).json({message: 'Le corps de la requête dois être du JSON valide'})
    }
    console.error("Erreur interne du serveur:", err)
    return res.status(500).json({message: 'Erreur interne du serveur'});

}