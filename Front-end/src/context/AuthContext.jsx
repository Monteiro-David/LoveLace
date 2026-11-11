import {createContext, useContext, useState, useEffect} from 'react';
import * as api from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        api.recpererMoi()
            .then((donnees) => setUtilisateur(donnees.utilisateur))
            .catch(() => setUtilisateur(null))
            .finally(() => setChargement(false));
    }, []);

    const seConnecter = async (identifiants) => {
        const donnees = await api.connecter(identifiants);
        setUtilisateur(donnees.utilisateur);
    };

    const seDeconnecter = async () => {
        await api.deconnecter();
        setUtilisateur(null);
    }

    return (
        <AuthContext.Provider value={{ utilisateur, chargement, seConnecter, seDeconnecter }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};