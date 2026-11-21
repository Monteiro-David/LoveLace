import { useAuth } from '../../context/AuthContext.jsx';

export function TableauDeBord() {
  const { utilisateur, seDeconnecter } = useAuth();
  return (
    <main className="carte-form">
      <h1>Bonjour {utilisateur.prenom}</h1>
      <p>Tu es connecté en tant que {utilisateur.role}.</p>
      <button type="button" onClick={seDeconnecter}>Se déconnecter</button>
    </main>
  );
}

export default TableauDeBord;
