import "./Connexion.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"

const Connexion = () => {

    const navigate = useNavigate();
    const { seConnecter } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreur, setErreur] = useState("")


    const gererConnexion = async (event) => {
        event.preventDefault();
        setErreur("");

        try {
            await seConnecter({email, mot_de_passe: password});

            console.log("Connexion réussie");
            navigate(); // ajouter la page d'accueil
        } catch (err) {
            setErreur(err.message || "Erreur lors de la connexion")
        }
    };

    const gererInscription = () => {
        navigate("/inscription")
    };

    return (
        <main>
            <h1>Bienvenue sur Lovelace Factory !</h1>
            <p>Connecte-toi pour créer des événements avec tes proches.</p>

            {erreur && <p style={{color: "red"}} role="alert">{erreur}</p>}
            
            <form onSubmit={gererConnexion}>

                <label htmlFor="email">Adresse e-mail</label>
                <input type="email"
                    id="email"
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="password">Mot de passe</label>
                <input type="password"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Se connecter</button>

            </form>

            <p>Pas encore de compte ?</p>

            <button type="button" onClick={gererInscription}>
                S'inscrire
            </button>
        </main>
    );
};

export default Connexion;