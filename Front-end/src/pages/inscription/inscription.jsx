import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inscrire } from "../../api/auth";
import "./inscription.css";

const Inscription = () => {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasseword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");

  const gererInscription = async (event) => {
    event.preventDefault();
    setErreur("");

    if (password !== confirmation) {
      setErreur("Le mot de passe ne correspond pas");
      return;
    }
    
    const utilisateur = {
      nom,
      prenom,
      pseudo,
      email,
      mot_de_passe: password,
    };

    try {
      await inscrire(utilisateur)
      console.log("Formulaire d'inscription valide");
    } catch (err) {
      setErreur(err.message || "Erreur lors de l'inscription");
    }
  };

  const gererConnexion = () => {
    navigate("./connexion");
  };

  return (
    <main>
      <h1> Inscription</h1>
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

        <label htmlFor="pseudo">Pseudo</label>
        <input 
        type="texte"
        id="pseudo"
        placeholder="Entrez votre pseudo"
        value={pseudo}
        onChange={(event) => setPseudo(event.target.value)}
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

        {erreur && <p style={{color: "red"}} role="alerte"> {erreur}</p>}

        <button type="submit">S'inscrire</button>
      </form>
      <p>Déja un compte ?</p>
      <button type="button" onClick={gererConnexion}>
        Se connecter
      </button>
    </main>
  );
};

export default Inscription;
