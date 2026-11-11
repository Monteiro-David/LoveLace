import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inscription.css";

const Inscription = () => {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasseword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");

  const gererInscription = (event) => {
    event.preventDefault();
    setErreur("");
    if (password !== confirmation) {
      setErreur("Le mot de passe ne correspond pas");
      return;
    }
    setErreur("");
    console.log("Formulaire envoyee");
    const utilisateur = {
      nom,
      prenom,
      email,
      mot_de_passe: password,
    };
    console.log("Formulaire d'inscription valide");
  };

  const gererConnexion = () => {
    navigate("./connexion");
  };

  return (
    <main>
      <h1>Bienvenue sur Lovelace Factory !</h1>
      <p>Inscris toi pour créer des événements avec tes proches.</p>
      <form onSubmit={gererInscription}>
        <label htmlFor="nom">Nom</label>
        <input
          type="texte"
          id="nom"
          placeholder="Entrez votre nom"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
          required
        />

        <label htmlFor="prenom">Prenom</label>
        <input
          type="texte"
          id="prenom"
          placeholder="Entrez votre prenom"
          value={prenom}
          onChange={(event) => setPrenom(event.target.value)}
          required
        />

        <label htmlFor="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(event) => setPasseword(event.target.value)}
          required
        />

        <label htmlFor="confirmation">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirmation"
          placeholder="Confirmer le mot de passe"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          required
        />

        {erreur && <p role="alerte"> {erreur}</p>}

        <button type="submit">S'inscrire</button>
      </form>

      <button type="button" onClick={gererConnexion}>
        Se connecter
      </button>
    </main>
  );
};

export default Inscription;
