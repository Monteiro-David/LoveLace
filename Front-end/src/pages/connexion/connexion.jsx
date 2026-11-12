import "./connexion.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Connexion = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const gererConnexion = (event) => {
        event.preventDefault();
        console.log("Formulaire envoyé");
    };

    const gererInscription = () => {
        navigate("/inscription")
    };

    return (
        <main>
            <h1>Bienvenue sur Lovelace Factory !</h1>
            <p>Connecte-toi pour créer des événements avec tes proches.</p>
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