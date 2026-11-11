async function appeler(chemin, option = {} ) {
    const res = await fetch(`/api/auth${chemin}`, {
        headers: {'Content-Type': 'application/json'},
        ...option,
    });
    if(res.status === 204) return;
    const donnees = await res.json().catch(() =>({}));
    if (!res.ok) {
        const erreur = new Error(donnees.message ?? 'Erreur inattendue');
        erreur.status = res.status;
        erreur.erreurs = donnees.erreurs ?? {};
        throw erreur;
    }
    return donnees;
}

export const inscrire = (infos) => 
    appeler('/inscription', { method: 'POST', body: JSON.stringify(infos) });

export const connecter = (identfiants) =>
    appeler('/connexion', { method: 'POST', body: JSON.stringify(identfiants) });

export const deconnecter = () => appeler('/deconnexion', {method: 'POST'});

export const recpererMoi = () => appeler('/moi');