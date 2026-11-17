import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export function RouteProteger({enfant}){
    const {utilisateur, chargement} = useAuth();
    const location = useLocation();

    if (chargement) {
        return <p role="status">Chargement...</p>;
    }

    if (!utilisateur) {
        return <Navigate to="/" replace state={{depuis: location.pathname}}/>
    }
    return enfant
}