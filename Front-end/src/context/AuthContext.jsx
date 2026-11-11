import {createContext, useContext, useState, useEffect} from 'react';
import * as api from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        api.recpererMoi()
            .then((donnees) => setUtilisateur(donnees.data))
            .catch(() => setUtilisateur(null))
            .finally(() => setChargement(false));
    }, []);

    const seConnecter = async (identifiants) => {
        const donnees = await api.connecter(identifiants);
        setUtilisateur(donnees.data);
    };

    const seDeconnecter = async () => {
        try {
            await api.deconnecter();
        } finally {
            setUtilisateur(null);
        }
    };

    return (
        <AuthContext.Provider value={{ utilisateur, chargement, seConnecter, seDeconnecter }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};