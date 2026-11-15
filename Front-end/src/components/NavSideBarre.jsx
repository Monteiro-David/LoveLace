import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NavSideBarre.css"; 

export function NavigationEtPanneauLateral() {
  const { utilisateur, seDeconnecter } = useAuth();
  const navigate = useNavigate();

  const gererDeconnexion = async () => {
    await seDeconnecter();
    navigate("/connexion");
  };

  return (
    <>
      <aside>
        <h1>LoveLace</h1>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/groupes">Mes Groupes</Link></li>
            <li><Link to="/evenement">Mes Événements</Link></li>
          </ul>
        </nav>
      </aside>
      
      <header>
        <div>
          <span>Bienvenue, <strong>{utilisateur?.pseudo || utilisateur?.prenom || "Utilisateur"}</strong> !</span>
          <button onClick={gererDeconnexion} type="button">
            Déconnexion
          </button>
        </div>
      </header>
    </>
  );
}