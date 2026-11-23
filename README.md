# Joya

Joya est une application web collaborative de gestion d'événements. Elle permet de créer des groupes d'utilisateurs, d'organiser des événements et de gérer les participants.

## Table des matières

* [Fonctionnalités](#fonctionnalités)
* [Stack Technique](#stack-technique)
* [Architecture du Projet](#architecture-du-projet)
* [Prérequis](#prérequis)
* [Installation et Démarrage avec Docker](#installation-et-démarrage-avec-docker)
* [Base de Données](#base-de-données)
* [Documentation de l'API](#documentation-de-lapi)
* [Contributeurs](#contributeurs)

## Fonctionnalités

* **Authentification & Sécurité** : Inscription, connexion, déconnexion, gestion de session via **JWT** stocké dans des cookies sécurisés (`httpOnly`), hachage des mots de passe avec `bcryptjs` et protection des routes côté client (`RouteProteger`).
* **Gestion des Utilisateurs** : Consultation et mise à jour des profils utilisateurs.
* **Gestion des Groupes** : Création, modification et suppression de groupes, gestion des membres, invitations et attribution des rôles (`admin` / `membre`) avec contrôle d'accès granulaire.
* **Gestion des Événements** : Création, consultation (événements créés ou rejoints), mise à jour et suppression d'événements liés aux utilisateurs et aux groupes.
* **Interface Front-end** : Pages de connexion, d'inscription et tableau de bord protégé avec gestion globale de l'état d'authentification (`AuthContext`).
* **Schéma Base de Données complet** : Prêt pour la gestion des tâches, des votes (dates/lieux) et des notifications.

## Stack Technique

### Back-end

* **Environnement** : Node.js 22 (Modules ES)
* **Framework Web** : Express (`^5.3.0`)
* **Base de données** : PostgreSQL (`pg`)
* **Authentification & Sécurité** : `jsonwebtoken`, `cookie-parser`, `bcryptjs`, `cors`
* **Outils** : `dotenv`, `nodemon`, `jest`

### Front-end

* **Framework** : React (`^19.2.8`) & Vite (`^8.3.0`)
* **Routage** : React Router (`react-router-dom` `^7.18.5`)
* **Qualité de code** : ESLint

### Conteneurisation & CI/CD

* **Docker & Docker Compose** : Orchestration des services `Lovelace_db`, `Lovelace_backend` (`node:22-alpine`) et `Lovelace_frontend` (`node:24-trixie-slim`).
* **GitHub Actions** : Workflows `ci.yml`, `security.yml` et `cd.yml` dans `.github/workflows/`.

## Architecture du Projet

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
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Prérequis

* [Docker](https://www.docker.com/) et Docker Compose installés.
* [Node.js](https://nodejs.org/) (v22 ou supérieur recommandé pour installer les dépendances en local avant le démarrage Docker).

## Installation et Démarrage avec Docker

Effectuez toutes les installations et la configuration avant de lancer la commande Docker à la racine du projet :

### 1. Cloner le dépôt et se placer à la racine

```bash
git clone https://github.com/Monteiro-David/LoveLace.git
cd LoveLace
```

### 2. Installer les dépendances du back-end et du front-end

```bash
cd Back-end && npm install && cd ..
cd Front-end && npm install && cd ..
```

### 3. Configurer les variables d'environnement

Copiez `Back-end/.env.example` vers `Back-end/.env` et renseignez vos variables (notamment `JWT_SECRET`, obligatoire au démarrage) :

```bash
cp Back-end/.env.example Back-end/.env
```

Exemple de contenu pour `Back-end/.env` :

```env
PORT=3000
FRONT_URL=http://localhost:5173

DB_HOST=Lovelace_db
DB_PORT=5432
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=Lovelace

JWT_SECRET=votre_cle_secrete_tres_longue
```

### 4. Démarrer tout le projet en une seule commande

Depuis la racine (`LoveLace/`), lancez le build et le démarrage de l'ensemble des conteneurs (`Lovelace_db`, `Lovelace_backend` et `Lovelace_frontend`) :

```bash
docker compose up -d --build
```

Commandes utiles pour suivre ou arrêter l'environnement :

```bash
docker compose logs -f
docker compose down
```

### 5. Accéder à l'application

* **Front-end** : <http://localhost:5173>
* **Back-end (API)** : <http://localhost:3000>
* **Test de connexion DB** : <http://localhost:3000/api/test/test-db>

## Base de Données

Une fois le service `Lovelace_db` démarré, exécutez les scripts SQL dans l'ordre pour créer le schéma, insérer les données de test et resynchroniser les séquences :

```bash
docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/migration/migration_up.sql
docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/seeds/seed.sql
docker exec -i Lovelace_db psql -U votre_utilisateur -d Lovelace < Back-end/database/seeds/seed_2026_11.sql
```

*(Pour supprimer toutes les tables, utilisez `Back-end/database/migration/migration_down.sql`.)*

## Documentation de l'API

### Test

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/test/test-db` | Vérifie la connexion à PostgreSQL |

### Authentification (`/api/auth`)

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/inscription` | Créer un nouveau compte utilisateur |
| `POST` | `/api/auth/connexion` | Connecter un utilisateur et définir le cookie JWT |
| `GET` | `/api/auth/moi` | Récupérer les informations de l'utilisateur connecté |
| `POST` | `/api/auth/deconnexion` | Déconnecter l'utilisateur et supprimer le cookie |

### Utilisateurs (`/api/utilisateurs`)

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/utilisateurs/profil/:id` | Récupérer le profil d'un utilisateur par ID |
| `PUT` | `/api/utilisateurs/profil/:id` | Mettre à jour les informations d'un profil |

### Groupes (`/api/groupe`)

*Toutes les routes ci-dessous nécessitent d'être authentifié.*

| Méthode | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/groupe` | Lister les groupes de l'utilisateur connecté | Authentifié |
| `POST` | `/api/groupe` | Créer un groupe (le créateur devient `admin`) | Authentifié |
| `GET` | `/api/groupe/:groupe_id` | Détails d'un groupe | Membre |
| `PUT` | `/api/groupe/:groupe_id` | Modifier un groupe | Admin |
| `DELETE` | `/api/groupe/:groupe_id` | Supprimer un groupe | Admin |
| `GET` | `/api/groupe/:groupe_id/membres` | Lister les membres d'un groupe | Membre |
| `POST` | `/api/groupe/:groupe_id/invitations` | Ajouter/inviter un membre dans le groupe | Admin |
| `PUT` | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Modifier le rôle d'un membre (`admin`/`membre`) | Admin |
| `DELETE` | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Quitter le groupe ou retirer un membre | Admin ou Soi-même |

### Événements (`/api/evenements`)

*Toutes les routes ci-dessous nécessitent d'être authentifié.*

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/evenements` | Lister les événements créés ou auxquels l'utilisateur est invité |
| `POST` | `/api/evenements` | Créer un nouvel événement |
| `GET` | `/api/evenements/:id_evenement` | Récupérer les détails d'un événement |
| `PUT` | `/api/evenements/:id_evenement` | Modifier la date, le lieu ou le statut d'un événement |
| `DELETE` | `/api/evenements/:id_evenement` | Supprimer un événement |

## Contributeurs

Ce projet a été développé par :

* **Monteiro David** ([@Monteiro-David](https://github.com/Monteiro-David))
* **Assy Wone** ([@sywone75-png](https://github.com/sywone75-png))
* **Mayulie** ([@Mayulie](https://github.com/Mayulie))