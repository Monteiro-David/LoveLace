import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationEtPanneauLateral } from "../../components/NavSideBarre.jsx";
import { useAuth } from "../../context/AuthContext";
import "./TableauDeBord.css";

export default function TableauDeBord() {
  const { utilisateur } = useAuth();

  const [prochainEvenement, setProchainEvenement] = useState(null);
  const [tousMesEvenements, setTousMesEvenements] = useState([]);
  const [mesGroupes, setMesGroupes] = useState([]);

  const [dateCalendrier, setDateCalendrier] = useState(new Date());
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

useEffect(() => {
    const chargerDonneesTableauDeBord = async () => {
      try {
        setChargement(true);

        const [repEvenements, repGroupes] = await Promise.all([
          fetch("/api/evenements").catch(() => null),
          fetch("/api/groupe").catch(() => null),
        ]);

        if (repEvenements && repEvenements.ok) {
          const donneesEvt = await repEvenements.json();
          const listeEvt = donneesEvt.data || donneesEvt || [];
          setTousMesEvenements(listeEvt);

          const maintenant = new Date();
          const evenementsAVenir = listeEvt
            .filter((evt) => new Date(evt.date) >= maintenant)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          setProchainEvenement(evenementsAVenir[0] || null);
        }

        if (repGroupes && repGroupes.ok) {
          const donneesGrp = await repGroupes.json();
          setMesGroupes(donneesGrp.data || donneesGrp || []);
        }
      } catch (err) {
        setErreur("Impossible de récupérer les informations du tableau de bord.");
      } finally {
        setChargement(false); 
      }
    };

    chargerDonneesTableauDeBord();
  }, []);

  const annee = dateCalendrier.getFullYear();
  const mois = dateCalendrier.getMonth();
  const nomMois = dateCalendrier.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const nombreJoursMois = new Date(annee, mois + 1, 0).getDate();

  const changerMois = (decalage) => {
    setDateCalendrier(new Date(annee, mois + decalage, 1));
  };

  const obtenirEvenementsDuJour = (jour) => {
    return tousMesEvenements.filter((evt) => {
      const dateEvt = new Date(evt.date);
      return (
        dateEvt.getDate() === jour &&
        dateEvt.getMonth() === mois &&
        dateEvt.getFullYear() === annee
      );
    });
  };

  if (chargement) {
    return <p role="status">Chargement de votre espace...</p>;
  }

  return (
    <div>
      <NavigationEtPanneauLateral />

      <main>
        <header>
          <div>
            <h1>Bonjour {utilisateur?.prenom || utilisateur?.pseudo} 👋</h1>
            <p>Les bons moments commencent par une bonne organisation.</p>
          </div>

          <Link to="/groupes/creer">+ Créer un groupe</Link>
        </header>

        {erreur && <p role="alert">{erreur}</p>}

        {/* 1. L'ÉVÉNEMENT À VENIR LE PLUS PROCHE */}
        <section>
          <h2>Mon prochain rendez-vous</h2>
          {prochainEvenement ? (
            <article>
              <h3>{prochainEvenement.titre}</h3>
              <p>
                Date :{" "}
                {new Date(prochainEvenement.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {prochainEvenement.lieu && <p>Lieu : {prochainEvenement.lieu}</p>}
              {prochainEvenement.description && <p>{prochainEvenement.description}</p>}
              <Link to={`/evenements/${prochainEvenement.id}`}>Voir les détails</Link>
            </article>
          ) : (
            <p>Tu n'es inscrit à aucun événement à venir pour le moment.</p>
          )}
        </section>

        {/* 2. MES GROUPES */}
        <section>
          <h2>Mes groupes ({mesGroupes.length})</h2>
          <Link to="/groupes">Voir tous mes groupes</Link>

          {mesGroupes.length === 0 ? (
            <div>
              <p>Tu n'appartiens encore à aucun groupe.</p>
              <Link to="/groupes/creer">Créer mon premier groupe</Link>
            </div>
          ) : (
            <div>
              {mesGroupes.map((groupe) => (
                <article key={groupe.id}>
                  <h3>{groupe.titre}</h3>
                  <p>{groupe.description || "Aucune description."}</p>
                  <Link to={`/groupes/${groupe.id}`}>Ouvrir le groupe</Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 3. CALENDRIER DE MES ÉVÉNEMENTS */}
        <section>
          <h2>Calendrier de mes événements</h2>
          <div>
            <button type="button" onClick={() => changerMois(-1)}>
              Mois précédent
            </button>
            <strong> {nomMois} </strong>
            <button type="button" onClick={() => changerMois(1)}>
              Mois suivant
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Événement(s) prévu(s)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: nombreJoursMois }, (_, index) => {
                const jour = index + 1;
                const evenementsJour = obtenirEvenementsDuJour(jour);

                return (
                  <tr key={jour}>
                    <td>
                      {jour} {dateCalendrier.toLocaleDateString("fr-FR", { month: "short" })}
                    </td>
                    <td>
                      {evenementsJour.length === 0 ? (
                        <span>-</span>
                      ) : (
                        <ul>
                          {evenementsJour.map((evt) => (
                            <li key={evt.id}>
                              <Link to={`/evenements/${evt.id}`}>{evt.titre}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}