import * as groupeModel from "../models/groupeModels.js";
import {ErreurHttp} from "../erreurs.js"

export const estMembre = async (req, res, next) => {
    const role = await groupeModel.RoleMembreParId(req.params.groupe_id, req.utilisateur.id);
    if (!role) throw new ErreurHttp(403, "Vous ne faites pas partie de ce groupe");
        next();
    
}

export const estAdmin = async (req, res, next) => {
    const role = await groupeModel.RoleMembreParId(req.params.groupe_id, req.utilisateur.id);
    if (role != "admin") throw new ErreurHttp(403, "Action réservée aux administrateurs du groupe");
    next();
}

export const estAdminOuNon = async (req, res, next) => {
    if (Number(req.params.utilisateur_id) === req.utilisateur.id) return next();
    return estAdmin(req, res, next);
}