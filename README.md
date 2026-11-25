# Joya

## 1. Le projet

**Joya** est une application web collaborative qui permet d'organiser des événements avec ses proches, ses amis ou ses collègues.

<<<<<<< Updated upstream
L'objectif est de centraliser l'organisation des événements au même endroit : création de groupes, gestion des membres, invitations et organisation des événements.
=======
- [Fonctionnalités](#fonctionnalités)
- [Stack Technique](#stack-technique)
- [Architecture du Projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation et Démarrage avec Docker](#installation-et-démarrage-avec-docker)
- [Base de Données](#base-de-données)
- [Documentation de l'API](#documentation-de-lapi)
- [Contributeurs](#contributeurs)
>>>>>>> Stashed changes

### Fonctionnalités développées

<<<<<<< Updated upstream
- **Authentification et gestion des profils :** inscription, connexion et gestion du profil utilisateur.
- **Création et gestion des groupes :** création et administration de groupes.
- **Gestion des membres et invitations :** ajout, gestion des membres et invitations à rejoindre un groupe.
- **Création et gestion des événements :** organisation et gestion des événements au sein des groupes.
=======
- **Authentification & Sécurité** : Inscription, connexion, déconnexion, gestion de session via **JWT** stocké dans des cookies sécurisés (`httpOnly`), hachage des mots de passe avec `bcryptjs` et protection des routes côté client (`RouteProteger`).
- **Gestion des Utilisateurs** : Consultation et mise à jour des profils utilisateurs.
- **Gestion des Groupes** : Création, modification et suppression de groupes, gestion des membres, invitations et attribution des rôles (`admin` / `membre`) avec contrôle d'accès granulaire.
- **Gestion des Événements** : Création, consultation (événements créés ou rejoints), mise à jour et suppression d'événements liés aux utilisateurs et aux groupes.
- **Interface Front-end** : Pages de connexion, d'inscription et tableau de bord protégé avec gestion globale de l'état d'authentification (`AuthContext`).
- **Schéma Base de Données complet** : Prêt pour la gestion des tâches, des votes (dates/lieux) et des notifications.
>>>>>>> Stashed changes

Le projet évolue progressivement dans le cadre de notre formation en développement et DevOps.

## 2. Stack technique

<<<<<<< Updated upstream
### Frontend
=======
- **Environnement** : Node.js 22 (Modules ES)
- **Framework Web** : Express (`^5.3.0`)
- **Base de données** : PostgreSQL (`pg`)
- **Authentification & Sécurité** : `jsonwebtoken`, `cookie-parser`, `bcryptjs`, `cors`
- **Outils** : `dotenv`, `nodemon`, `jest`
>>>>>>> Stashed changes

- **React 19** : bibliothèque JavaScript pour construire l'interface utilisateur.
- **Vite** : outil de développement et de compilation.
- **React Router DOM** : gestion de la navigation.
- **ESLint** : analyse et vérification du code.

<<<<<<< Updated upstream
### Backend

- **Node.js** : environnement d'exécution JavaScript.
- **Express 5** : framework pour construire l'API REST.
- **PostgreSQL 16** : système de gestion de base de données relationnelle.
- **node-postgres (pg)** : connexion entre le backend et PostgreSQL.
- **JWT** : gestion des jetons d'authentification.
- **bcryptjs** : hachage des mots de passe.
- **cookie-parser** : gestion des cookies.
- **dotenv** : gestion des variables d'environnement.
- **CORS** : gestion des échanges entre frontend et backend.

### DevOps
=======
- **Framework** : React (`^19.2.8`) & Vite (`^8.3.0`)
- **Routage** : React Router (`react-router-dom` `^7.18.5`)
- **Qualité de code** : ESLint

### Conteneurisation & DevOps

- **Docker & Docker Compose** : Conteneurisation et orchestration des services `Lovelace_db`, `Lovelace_backend` (`node:22-alpine`) et `Lovelace_frontend` (`node:24-trixie-slim`).
- **GitHub Actions** : Workflows d'intégration continue (CI) et de vérification de sécurité.
- **CI** : Le workflow vérifie notamment l'installation des dépendances et la compilation du front-end. Les tests backend sont prévus, mais ne sont pas encore mis en place.
- **CD** : Le déploiement continu n'est pas encore mis en place.
>>>>>>> Stashed changes

- **Docker** : conteneurisation des services.
- **Docker Compose** : orchestration du frontend, du backend et de la base de données.
- **GitHub Actions** : mise en place progressive de l'intégration continue (CI).

<<<<<<< Updated upstream
La démarche DevOps est enrichie au fur et à mesure de notre apprentissage.

## 3. Prérequis

Avant de démarrer le projet, vous devez disposer des outils suivants :

- Git
- Node.js et npm
- Docker
- Docker Compose

Vérifier les installations :

```bash
node --version
npm --version
docker --version
docker compose version
git --version
=======
```text
LoveLace/
├── .github/
│   └── workflows/
│       ├── cd.yml
│       ├── ci.yml
│       └── security.yml
├── Back-end/
│   ├── database/
│   │   ├── migration/
│   │   │   ├── migration_down.sql
│   │   │   └── migration_up.sql
│   │   └── seeds/
│   │       ├── seed.sql
│   │       └── seed_2026_11.sql
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── evenementController.js
│   │   │   ├── groupeController.js
│   │   │   └── utilisateurController.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   ├── droitsGroupe.js
│   │   │   └── erreurs.js
│   │   ├── models/
│   │   │   ├── authModel.js
│   │   │   ├── evenementModel.js
│   │   │   ├── groupeModels.js
│   │   │   └── utilisateurModel.js
│   │   ├── Routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── evenementRoutes.js
│   │   │   ├── groupeRoutes.js
│   │   │   ├── testRoutes.js
│   │   │   └── utilisateurRoutes.js
│   │   ├── services/
│   │   │   ├── authServices.js
│   │   │   ├── evenementService.js
│   │   │   ├── groupeService.js
│   │   │   └── utilisateurService.js
│   │   ├── erreurs.js
│   │   ├── index.js
│   │   └── server.js
│   ├── tests/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── requette.http
├── Front-end/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── NavSideBarre.css
│   │   │   ├── NavSideBarre.jsx
│   │   │   └── RouteProteger.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── connexion/
│   │   │   │   ├── connexion.css
│   │   │   │   └── connexion.jsx
│   │   │   ├── inscription/
│   │   │   │   ├── inscription.css
│   │   │   │   └── inscription.jsx
│   │   │   └── tableau_de_bord/
│   │   │       ├── TableauDeBord.css
│   │   │       └── TableauDeBord.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── docs/
│   └── CHOIX_TECHNIQUES.md
├── .gitignore
├── docker-compose.yml
└── README.md
>>>>>>> Stashed changes
```

## 4. Installation

<<<<<<< Updated upstream
### 4.1 Cloner le projet
=======
- [Docker](https://www.docker.com/) et Docker Compose installés.
- [Node.js](https://nodejs.org/) (v22 ou supérieur recommandé pour installer les dépendances en local avant le démarrage Docker).

## Installation et Démarrage avec Docker

Effectuez les installations et la configuration avant de lancer la commande Docker à la racine du projet.

### 1. Cloner le dépôt et se placer à la racine
>>>>>>> Stashed changes

```bash
git clone https://github.com/Monteiro-David/LoveLace.git
cd LoveLace
```

### 4.2 Installer les dépendances

Installer les dépendances du backend :

```bash
cd Back-end
npm install
```

Revenir à la racine puis installer celles du frontend :

<<<<<<< Updated upstream
```bash
cd ../Front-end
npm install
```

Revenir à la racine du projet :

```bash
cd ..
```

### 4.3 Configurer les variables d'environnement

Créer le fichier `.env` dans le dossier `Back-end/`, à partir du fichier `.env.example` :
=======
Copiez `Back-end/.env.example` vers `Back-end/.env` :
>>>>>>> Stashed changes

```bash
cp Back-end/.env.example Back-end/.env
```

<<<<<<< Updated upstream
Renseigner ensuite les variables nécessaires :

```env
# Configuration du serveur
PORT=3000

# Configuration PostgreSQL
DB_HOST=database
DB_PORT=5432
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=Lovelace

# Secret JWT
JWT_SECRET=votre_secret
```

**Important :**

- Le fichier `.env` contient des informations sensibles et ne doit pas être partagé ni ajouté au dépôt Git.
- `DB_HOST=database` permet au backend de communiquer avec le service PostgreSQL dans Docker Compose.
- Les identifiants de connexion doivent être cohérents avec la configuration du service PostgreSQL.

## 5. Lancer le projet

Le projet utilise Docker Compose pour démarrer les trois services avec une seule commande.

Depuis la racine du projet :
=======
Ouvrez ensuite `Back-end/.env` et renseignez les variables suivantes :

| Variable      | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| `PORT`        | Port utilisé par le serveur back-end (3000).                           |
| `FRONT_URL`   | Adresse du front-end utilisée par le back-end (http://localhost:5173). |
| `DB_HOST`     | Nom du service PostgreSQL dans Docker Compose (`database`).            |
| `DB_PORT`     | Port PostgreSQL (5432).                                                |
| `DB_USER`     | Nom de l'utilisateur PostgreSQL.                                       |
| `DB_PASSWORD` | Mot de passe de l'utilisateur PostgreSQL.                              |
| `DB_NAME`     | Nom de la base de données (`Lovelace`).                                |
| `JWT_SECRET`  | Clé secrète utilisée pour signer les tokens JWT.                       |

**Générer une clé secrète JWT :**

Dans un terminal, exécutez :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez la clé générée dans la variable `JWT_SECRET` de votre fichier `.env`.

Ne partagez jamais votre fichier `.env` et ne publiez pas vos véritables identifiants ou clés secrètes sur GitHub.

### 4. Démarrer tout le projet en une seule commande

Depuis la racine (`LoveLace/`), lancez la construction et le démarrage des conteneurs :
>>>>>>> Stashed changes

```bash
docker compose --env-file Back-end/.env up -d --build
```

<<<<<<< Updated upstream
Cette commande :

- construit les images Docker du frontend et du backend ;
- démarre le conteneur PostgreSQL ;
- démarre le backend ;
- démarre le frontend en dépendance du backend.

### Accéder à l'application

Une fois les conteneurs démarrés :

| Service    | Adresse               |
| ---------- | --------------------- |
| Frontend   | http://localhost:5173 |
| Backend    | http://localhost:3000 |
| PostgreSQL | localhost:5432        |

### Initialiser la base de données

L'initialisation de la base de données est effectuée manuellement.

Une fois le conteneur PostgreSQL démarré, exécuter la migration :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/migration/migration_up.sql
```

Remplacer `<DB_USER>` et `<DB_NAME>` par les valeurs renseignées dans le fichier `.env`.

Exécuter ensuite les scripts de seed :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/seeds/seed.sql
```

Si le projet utilise également le jeu de données complémentaire :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/seeds/seed_2026_11.sql
```

Ces scripts permettent de créer la structure de la base de données et d'insérer les données nécessaires au fonctionnement de l'application.

**Attention :** les migrations et les seeds doivent être exécutés dans le bon ordre. Ne relancez pas une migration de création sur une base déjà initialisée sans vérifier son contenu.

### Vérifier les conteneurs

Afficher les conteneurs actifs :

```bash
docker compose ps
```

Consulter les logs :
=======
L'option `--env-file Back-end/.env` permet à Docker Compose de récupérer les variables utilisées pour configurer le service PostgreSQL.

Commandes utiles pour suivre ou arrêter l'environnement :
>>>>>>> Stashed changes

```bash
# Suivre les logs des conteneurs
docker compose logs -f
<<<<<<< Updated upstream
```

Consulter les logs d'un service particulier :

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f database
```

### Arrêter le projet

Arrêter les conteneurs :

```bash
docker compose down
```

Pour arrêter les conteneurs et supprimer également le volume de données PostgreSQL :

```bash
docker compose down -v
```

**Attention :** cette dernière commande supprime les données stockées dans le volume de la base de données.
=======

# Arrêter les conteneurs
docker compose down
```

### 5. Accéder à l'application

- **Front-end** : http://localhost:5173
- **Back-end (API)** : http://localhost:3000
- **Test de connexion DB** : http://localhost:3000/api/test/test-db

**Attention :** les ports suivants doivent être disponibles sur votre machine :

- `5173` : front-end
- `3000` : back-end
- `5432` : PostgreSQL

### 6. Tester l'application

Une fois les services démarrés et la base de données initialisée :

1. Ouvrez le front-end à l'adresse http://localhost:5173.
2. Accédez à la page d'inscription.
3. Créez un compte utilisateur.
4. Connectez-vous avec les identifiants créés.
5. Vérifiez que vous accédez au tableau de bord et que les fonctionnalités accessibles fonctionnent.

## Base de Données

Une fois le service `Lovelace_db` démarré, exécutez manuellement les scripts SQL dans l'ordre pour créer le schéma et insérer les données :

```bash
docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/migration/migration_up.sql

docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/seeds/seed.sql

docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/seeds/seed_2026_11.sql
```

Remplacez `votre_utilisateur` par la valeur renseignée dans `DB_USER` dans votre fichier `.env`.

Pour supprimer toutes les tables, utilisez le script `Back-end/database/migration/migration_down.sql`.

## Dépannage

### Un port est déjà utilisé

Si Docker ne parvient pas à démarrer un service, un autre programme utilise peut-être déjà l'un des ports nécessaires.

Pour identifier le programme qui utilise un port :

```bash
lsof -i :3000
lsof -i :5173
lsof -i :5432
```

Si un programme utilise déjà le port, arrêtez-le ou modifiez la configuration du port concerné dans `docker-compose.yml`.

### Les conteneurs ne démarrent pas

Consultez les logs pour identifier l'origine du problème :

```bash
docker compose logs
```

Vous pouvez également vérifier l'état des conteneurs :

```bash
docker compose ps
```
>>>>>>> Stashed changes

## 6. Scripts disponibles

### Backend

<<<<<<< Updated upstream
Depuis le dossier `Back-end/` :
=======
| Méthode | Endpoint            | Description                       |
| :------ | :------------------ | :-------------------------------- |
| `GET`   | `/api/test/test-db` | Vérifie la connexion à PostgreSQL |
>>>>>>> Stashed changes

| Commande      | Description                                            |
| ------------- | ------------------------------------------------------ |
| `npm run dev` | Démarre le serveur en mode développement avec Nodemon. |
| `npm start`   | Démarre le serveur en mode production.                 |

<<<<<<< Updated upstream
### Frontend
=======
| Méthode | Endpoint                | Description                                          |
| :------ | :---------------------- | :--------------------------------------------------- |
| `POST`  | `/api/auth/inscription` | Créer un nouveau compte utilisateur                  |
| `POST`  | `/api/auth/connexion`   | Connecter un utilisateur et définir le cookie JWT    |
| `GET`   | `/api/auth/moi`         | Récupérer les informations de l'utilisateur connecté |
| `POST`  | `/api/auth/deconnexion` | Déconnecter l'utilisateur et supprimer le cookie     |
>>>>>>> Stashed changes

Depuis le dossier `Front-end/` :

<<<<<<< Updated upstream
| Commande          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Démarre le serveur Vite en mode développement. |
| `npm run build`   | Compile l'application pour la production.      |
| `npm run preview` | Prévisualise la version compilée.              |
| `npm run lint`    | Analyse le code avec ESLint.                   |
=======
| Méthode | Endpoint                       | Description                                 |
| :------ | :----------------------------- | :------------------------------------------ |
| `GET`   | `/api/utilisateurs/profil/:id` | Récupérer le profil d'un utilisateur par ID |
| `PUT`   | `/api/utilisateurs/profil/:id` | Mettre à jour les informations d'un profil  |
>>>>>>> Stashed changes

Le lancement habituel de l'ensemble du projet se fait avec Docker Compose depuis la racine.

<<<<<<< Updated upstream
## 7. Dépendances du projet

Les dépendances sont gérées séparément pour le frontend et le backend.
=======
Toutes les routes ci-dessous nécessitent d'être authentifié.

| Méthode  | Endpoint                                         | Description                                     | Permissions       |
| :------- | :----------------------------------------------- | :---------------------------------------------- | :---------------- |
| `GET`    | `/api/groupe`                                    | Lister les groupes de l'utilisateur connecté    | Authentifié       |
| `POST`   | `/api/groupe`                                    | Créer un groupe (le créateur devient `admin`)   | Authentifié       |
| `GET`    | `/api/groupe/:groupe_id`                         | Détails d'un groupe                             | Membre            |
| `PUT`    | `/api/groupe/:groupe_id`                         | Modifier un groupe                              | Admin             |
| `DELETE` | `/api/groupe/:groupe_id`                         | Supprimer un groupe                             | Admin             |
| `GET`    | `/api/groupe/:groupe_id/membres`                 | Lister les membres d'un groupe                  | Membre            |
| `POST`   | `/api/groupe/:groupe_id/invitations`             | Ajouter/inviter un membre dans le groupe        | Admin             |
| `PUT`    | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Modifier le rôle d'un membre (`admin`/`membre`) | Admin             |
| `DELETE` | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Quitter le groupe ou retirer un membre          | Admin ou Soi-même |
>>>>>>> Stashed changes

### Backend

<<<<<<< Updated upstream
Les principales dépendances sont :

- `express` : création de l'API.
- `pg` : connexion à PostgreSQL.
- `bcryptjs` : sécurisation des mots de passe.
- `jsonwebtoken` : gestion des jetons JWT.
- `cookie-parser` : lecture des cookies.
- `cors` : gestion des requêtes cross-origin.
- `dotenv` : chargement des variables d'environnement.
- `nodemon` : redémarrage automatique du serveur en développement.
- `jest` : environnement de tests prévu pour le backend.
=======
Toutes les routes ci-dessous nécessitent d'être authentifié.

| Méthode  | Endpoint                        | Description                                                      |
| :------- | :------------------------------ | :--------------------------------------------------------------- |
| `GET`    | `/api/evenements`               | Lister les événements créés ou auxquels l'utilisateur est invité |
| `POST`   | `/api/evenements`               | Créer un nouvel événement                                        |
| `GET`    | `/api/evenements/:id_evenement` | Récupérer les détails d'un événement                             |
| `PUT`    | `/api/evenements/:id_evenement` | Modifier la date, le lieu ou le statut d'un événement            |
| `DELETE` | `/api/evenements/:id_evenement` | Supprimer un événement                                           |
>>>>>>> Stashed changes

### Frontend

Les principales dépendances sont :

<<<<<<< Updated upstream
- `react` et `react-dom` : construction de l'interface.
- `react-router-dom` : navigation entre les pages.
- `vite` : environnement de développement et compilation.
- `eslint` : qualité et analyse du code.

## 8. Structure du projet

```text
LoveLace/
│
├── .github/
│   └── workflows/
│       ├── ci.yaml
│       └── security.yaml
│
├── Back-end/
│   ├── database/
│   │   ├── migration/
│   │   │   ├── migration_up.sql
│   │   │   └── migration_down.sql
│   │   └── seeds/
│   │       ├── seed.sql
│   │       └── seed_2026_11.sql
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── Routes/
│   │   ├── services/
│   │   ├── errors/
│   │   ├── index.js
│   │   └── server.js
│   │
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── Front-end/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

Cette structure présente les principaux dossiers du projet. Certains sous-dossiers peuvent évoluer au fil du développement.

## 9. Dépannage

### Docker ne démarre pas

Vérifier que Docker Desktop est lancé :

```bash
docker info
```

### Un conteneur ne démarre pas

Afficher les logs :

```bash
docker compose logs -f
```

### Le backend ne se connecte pas à PostgreSQL

Vérifier les éléments suivants :

- Le conteneur PostgreSQL est démarré.
- Les identifiants de connexion sont corrects.
- `DB_HOST` correspond au nom du service Docker, soit `database`.
- Les variables d'environnement sont correctement renseignées.

### Le frontend ne communique pas avec le backend

Vérifier que les trois conteneurs sont actifs :

```bash
docker compose ps
```

Vérifier également la configuration du proxy Vite et la variable `VITE_API_TARGET`.

### Le port est déjà utilisé

Si un port est déjà occupé, identifier le processus qui l'utilise avant de relancer Docker.

Par exemple :

```bash
lsof -i :3000
lsof -i :5173
lsof -i :5432
```

## 10. Contribuer

Les contributions au projet sont organisées avec Git et GitHub.

Nous utilisons une organisation basée sur les branches et les Pull Requests.

### Workflow de contribution

1. Se placer sur la branche principale et récupérer les dernières modifications :

```bash
git switch master
git pull origin master
```

2. Créer une branche dédiée à sa fonctionnalité ou à sa correction :

```bash
git switch -c feat/nom-de-la-fonctionnalite
```

3. Développer et tester ses modifications.

4. Ajouter et committer les changements :

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
```

5. Envoyer sa branche sur GitHub :

```bash
git push -u origin feat/nom-de-la-fonctionnalite
```

6. Ouvrir une Pull Request vers `master`.

7. Faire relire et valider les modifications avant leur fusion.

### Convention de commits

Nous utilisons les préfixes suivants :

| Préfixe     | Utilisation                      |
| ----------- | -------------------------------- |
| `feat:`     | Ajout d'une fonctionnalité       |
| `fix:`      | Correction d'un bug              |
| `docs:`     | Modification de la documentation |
| `refactor:` | Réorganisation du code           |
| `test:`     | Ajout ou modification de tests   |
| `chore:`    | Maintenance et configuration     |

## 11. Équipe

Projet réalisé dans le cadre de notre formation en développement web et DevOps.

| Collaborateur  | GitHub                                               |
| -------------- | ---------------------------------------------------- |
| Monteiro David | [@Monteiro-David](https://github.com/Monteiro-David) |
| Assy Wone      | [@sywone75-png](https://github.com/sywone75-png)     |
| Mayulie        | [@Mayulie](https://github.com/Mayulie)               |

---

_Joya — Organiser ensemble, simplement._
=======
- **Monteiro David** ([@Monteiro-David](https://github.com/Monteiro-David))
- **Assy Wone** ([@sywone75-png](https://github.com/sywone75-png))
- **Mayulie** ([@Mayulie](https://github.com/Mayulie))
>>>>>>> Stashed changes
