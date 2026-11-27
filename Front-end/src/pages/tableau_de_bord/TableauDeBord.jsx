import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./TableauDeBord.css";

async function appelerApi(url, options = {}) {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const donnees = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(donnees.message || "Erreur lors de l'appel au serveur");
  }
  return donnees;
}

export function TableauDeBord({ onOuvrirCreationGroupe }) {
  const { utilisateur } = useAuth();

  const [groupes, setGroupes] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [reponseEnCoursId, setReponseEnCoursId] = useState(null);

  const chargerDonnees = useCallback(async () => {
    setChargement(true);
    setErreur("");
    try {
      const [repGroupes, repEvenements] = await Promise.all([
        appelerApi("/api/groupe"),
        appelerApi("/api/evenements"),
      ]);

      const listeGroupes = repGroupes.data ?? repGroupes ?? [];
      const listeEvenements = repEvenements.data ?? repEvenements ?? [];

      const maintenant = new Date();
      const prochainsEvenements = [...listeEvenements]
        .filter((ev) => {
          const dateVal = ev.date || ev.date_evenement;
          return !dateVal || new Date(dateVal) >= maintenant;
        })
        .sort(
          (a, b) =>
            new Date(a.date || a.date_evenement) -
            new Date(b.date || b.date_evenement)
        );

      setGroupes(listeGroupes);
      setEvenements(prochainsEvenements);
      setInvitations([]);
    } catch (err) {
      setErreur(err.message || "Impossible de charger le tableau de bord.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    chargerDonnees();
  }, [chargerDonnees]);

  const gererClicCreationGroupe = () => {
    if (typeof onOuvrirCreationGroupe === "function") {
      onOuvrirCreationGroupe(chargerDonnees);
    }
  };

  const repondreInvitation = async (invitationId, acceptee) => {
    setReponseEnCoursId(invitationId);
    setErreur("");
    try {
      // À brancher dès que la route back-end d'acceptation/refus d'invitation est créée
      setInvitations((prev) =>
        prev.filter((inv) => (inv.id ?? inv.invitation_id) !== invitationId)
      );
      if (acceptee) {
        await chargerDonnees();
      }
    } catch (err) {
      setErreur(
        err.message || "Impossible de répondre à cette invitation."
      );
    } finally {
      setReponseEnCoursId(null);
    }
  };

  const formaterDate = (dateStr) => {
    if (!dateStr) return "Date à définir";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const prenomAffichage = utilisateur?.prenom || utilisateur?.pseudo || "";

  return (
    <div className="dashboard-conteneur">
      <header className="dashboard-entete">
        <h1>
          Bonjour {prenomAffichage ? `${prenomAffichage} !` : "et bienvenue !"}
        </h1>
        <p>
          Retrouve ici tes groupes, tes prochains événements et tes invitations en
          attente.
        </p>
      </header>

      {erreur && (
        <p className="dashboard-erreur" role="alert">
          {erreur}
        </p>
      )}

      {chargement ? (
        <p role="status">Chargement…</p>
      ) : (
        <div className="dashboard-grille">
          {/* 1. Groupes où l'utilisateur est inscrit */}
          <section className="dashboard-colonne">
            <div className="colonne-entete">
              <h2>Mes groupes ({groupes.length})</h2>
              <button
                type="button"
                className="btn-principal"
                onClick={gererClicCreationGroupe}
              >
                Créer un groupe
              </button>
            </div>

            {groupes.length === 0 ? (
              <p className="etat-vide">
                Tu n’es inscrit dans aucun groupe pour le moment.
              </p>
            ) : (
              <ul className="liste-cartes">
                {groupes.map((groupe) => (
                  <li key={groupe.id ?? groupe.groupe_id} className="carte-item">
                    <div className="carte-item-haut">
                      <strong>{groupe.titre || groupe.nom}</strong>
                      {groupe.role && (
                        <span className="badge">{groupe.role}</span>
                      )}
                    </div>
                    {groupe.description && <p>{groupe.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 2. Événements les plus proches à venir */}
          <section className="dashboard-colonne">
            <div className="colonne-entete">
              <h2>Prochains événements ({evenements.length})</h2>
            </div>

            {evenements.length === 0 ? (
              <p className="etat-vide">
                Aucun événement à venir pour le moment.
              </p>
            ) : (
              <ul className="liste-cartes">
                {evenements.map((ev) => (
                  <li key={ev.id ?? ev.id_evenement} className="carte-item">
                    <div className="carte-item-haut">
                      <strong>{ev.titre || ev.nom || "Événement"}</strong>
                      {(ev.status_final || ev.statut) && (
                        <span className="badge">
                          {ev.status_final || ev.statut}
                        </span>
                      )}
                    </div>
                    <p className="meta-ligne">
                      {formaterDate(ev.date || ev.date_evenement)}
                      {ev.lieu ? ` • ${ev.lieu}` : ""}
                    </p>
                    {ev.description && <p>{ev.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 3. Invitations en attente de réponse */}
          <section className="dashboard-colonne">
            <div className="colonne-entete">
              <h2>Invitations en attente ({invitations.length})</h2>
            </div>

            {invitations.length === 0 ? (
              <p className="etat-vide">
                Aucune invitation en attente de réponse.
              </p>
            ) : (
              <ul className="liste-cartes">
                {invitations.map((inv) => {
                  const id = inv.id ?? inv.invitation_id;
                  const titre =
                    inv.groupe_nom ||
                    inv.evenement_titre ||
                    inv.titre ||
                    inv.nom ||
                    "Invitation";
                  const occupe = reponseEnCoursId === id;

                  return (
                    <li key={id} className="carte-item">
                      <div className="carte-item-haut">
                        <strong>{titre}</strong>
                      </div>
                      <div className="invitation-actions">
                        <button
                          type="button"
                          className="btn-accepter"
                          disabled={occupe}
                          onClick={() => repondreInvitation(id, true)}
                        >
                          Accepter
                        </button>
                        <button
                          type="button"
                          className="btn-refuser"
                          disabled={occupe}
                          onClick={() => repondreInvitation(id, false)}
                        >
                          Refuser
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default TableauDeBord;
