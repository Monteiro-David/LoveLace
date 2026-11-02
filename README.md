# LoveLace 🚀

LoveLace est une application web collaborative de gestion d'événements et de groupes. Elle permet de créer des cercles d'utilisateurs, d'organiser des événements, de participer à des votes (dates/lieux), d'assigner des tâches logistiques et de suivre ses notifications en temps réel.

---

## 🛠️ Stack Technique

* **Frontend :** React (via Vite)
* **Backend :** Node.js, Express
* **Base de données :** PostgreSQL (exécuté via Docker)
* **Outils :** Docker Compose, Git

---

## 📁 Arborescence du Projet

LoveLace/
├── docker-compose.yml        # Configuration du conteneur PostgreSQL
├── Lovelace.sql              # Script global de migration et de peuplement (Bdd)
├── .gitignore
├── README.md
│
├── backend/                  # API REST (Node.js / Express)
│   ├── package.json
│   ├── .env                  # Variables d'environnement (PORT, DB_*)
│   └── src/
│       ├── config/           # Connexion à la base de données
│       ├── middlewares/      # Authentification et sécurité (JWT)
│       ├── routes/           # Contrôleurs et routes API (groupes, événements, etc.)
│       └── server.js         # Point d'entrée de l'API
│
└── frontend/                 # Application Client (React / Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── assets/           # Ressources graphiques
        ├── components/       # Composants réutilisables (modales, cartes)
        ├── pages/            # Pages de l'application (Auth, Accueil, Votes, etc.)
        ├── services/         # Appels API (Fetch / Axios)
        ├── App.jsx           # Routage principal
        └── main.jsx          # Point d'entrée React

---

## 🗄️ Modèle de Données (PostgreSQL)
Le schéma relationnel repose sur 8 tables principales sécurisées par des contraintes CHECK strictes :

Utilisateur : Gestion des profils et identifiants uniques.

Groupe : Espaces communautaires.

Utilisateur_Groupe : Table de liaison avec rôles (admin, membre).

Evenement : Planification avec statuts gérés (confirmé, annulé, en attente).

Invitation : Gestion des participations (groupes et événements).

Tache : Suivi logistique et états d'avancement.

PropositionVote : Système de vote interactif (dates et lieux).

Notification : Alertes contextuelles pour les utilisateurs

---

## 🚀 Guide d'Installation et de Lancement
1. Prérequis
Avoir Docker et Docker Desktop installés.

Avoir Node.js installé sur votre machine.

2. Lancer la Base de Données (Docker)
À la racine du projet, lance le conteneur PostgreSQL configuré dans ton docker-compose.yml :

Bash
docker compose up -d
Le fichier Lovelace.sql placé dans le dossier s'exécutera automatiquement au premier lancement pour initialiser les tables et insérer les données de test.

3. Configurer et Lancer le Backend
Rends-toi dans le dossier Back-end :

Bash
cd backend
Assure-toi d'avoir un fichier .env configuré avec tes accès (ex: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).
Installe les dépendances :

Bash
npm install
Lance le serveur de développement :

Bash
npm run dev
Le serveur écoute par défaut sur http://localhost:3000. Vous pouvez tester la connexion à la base de données en vous rendant sur : http://localhost:3000/api/test/test-db.
4. Lancer le Frontend
Ouvre un autre terminal et rends-toi dans le dossier Front-end :

Bash
cd Front-end
Installe les dépendances :

Bash
npm install
Lance l'application React :

Bash
npm run dev

---

## 🌿 Workflow Git & Collaboration
Pour contribuer au projet, respectez les règles suivantes :

Créez une branche dédiée par fonctionnalité : git checkout -b feature/VotreNom/nom-de-la-fonctionnalite

Suivez la convention Conventional Commits pour vos messages (ex: feat(auth): ajout du formulaire de connexion, fix(db): correction de contrainte).

Ouvrez une Pull Request sur GitHub pour validation avant fusion sur master / main.
