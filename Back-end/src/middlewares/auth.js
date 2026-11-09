import  jwt from "jsonwebtoken";
import {ErreurHttp} from "../erreurs.js";

export function auth(req, res, next){
    const token = req.cookies.token;
    if (!token){
        throw new ErreurHttp(401, 'Connexion requise');
    }
    try {
        const contenu = jwt.verify(token, process.env.JWT_SECRET);
        req.utilisateur = {id: contenu.id, pseudo: contenu.pseudo, email: contenu.email};
        next();
    } catch (err) {
        throw new ErreurHttp(401, 'Session expirée ou invalide');
    }
}