# Joya 

Joya est une application web collaborative de gestion d'événements. Elle permet de créer des groupes d'utilisateurs, d'organiser des événements.


##  Table des matières

* [Fonctionnalités](#-fonctionnalités)

* [Stack Technique](#-stack-technique)

* [Architecture du Projet](#-architecture-du-projet)

* [Prérequis](#-prérequis)

* [Installation et Configuration](#-installation-et-configuration)

* [Base de Données](#-base-de-données)

* [Documentation de l'API](#-documentation-de-lapi)

* [Contributeurs](#-contributeurs)

  ## Fonctionnalités

* **Authentification & Sécurité** : Inscription, connexion, gestion de session via **JWT** stocké dans des cookies sécurisés (`httpOnly`), hachage des mots de passe avec `bcryptjs`.

* **Gestion des Utilisateurs** : Consultation et mise à jour des profils utilisateurs.

* **Gestion des Groupes** : Création, modification et suppression de groupes, gestion des membres, invitations et attribution des rôles (`admin` / `membre`) avec contrôle d'accès granulaire.

* **Gestion des Événements** : Création, consultation (événements créés ou rejoints), mise à jour et suppression d'événements liés aux utilisateurs et aux groupes.

* **Schéma Base de Données complet** : Prêt pour la gestion des tâches, des votes (dates/lieux) et des notifications.

##  Stack Technique

* **Environnement** : Node.js (Modules ES)

* **Framework Web** : Express (`^5.3.0`)

* **Base de données** : PostgreSQL (`pg`)

* **Authentification** : JSON Web Token (`jsonwebtoken`) & `cookie-parser`

* **Sécurité** : `bcryptjs`, `cors`

* **Outils de développement** : `dotenv`, `nodemon`, `jest`

##  Architecture du Projet

```
back-end/
├── src/
│   ├── config/
│   │   └── db.js                 # Configuration du pool de connexion PostgreSQL
│   ├── controllers/
│   │   ├── authController.js     # Logique de contrôle d'authentification
│   │   ├── evenementController.js# Logique de contrôle des événements
│   │   ├── groupeController.js   # Logique de contrôle des groupes et membres
│   │   └── utilisateurController.js # Logique de contrôle des profils
│   ├── middlewares/
│   │   ├── auth.js               # Vérification du token JWT (cookies)
│   │   ├── droitsGroupe.js       # Vérification des rôles (membre / admin)
│   │   └── erreurs.js            # Gestionnaire global d'erreurs HTTP
│   ├── models/
│   │   ├── authModel.js          # Requêtes SQL liées à l'authentification
│   │   ├── evenementModel.js     # Requêtes SQL liées aux événements
│   │   ├── groupeModels.js       # Requêtes SQL liées aux groupes
│   │   └── utilisateurModel.js   # Requêtes SQL liées aux utilisateurs
│   ├── Routes/
│   │   ├── authRoutes.js         # Routes /api/auth
│   │   ├── evenementRoutes.js    # Routes /api/evenements
│   │   ├── groupeRoutes.js       # Routes /api/groupe
│   │   ├── testRoutes.js         # Routes /api/test
│   │   └── utilisateurRoutes.js  # Routes /api/utilisateurs
│   ├── services/
│   │   ├── authServices.js       # Règles métier d'authentification
│   │   ├── evenementService.js   # Règles métier des événements
│   │   ├── groupeService.js      # Règles métier des groupes
│   │   └── utilisateurService.js # Règles métier des utilisateurs
│   ├── erreurs.js                # Classe personnalisée ErreurHttp
│   ├── index.js                  # Configuration de l'application Express
│   └── server.js                 # Point d'entrée et démarrage du serveur
├── migration_up.sql              # Création des tables PostgreSQL
├── migration_down.sql            # Suppression des tables PostgreSQL
├── seed.sql                      # Jeu de données initiales (utilisateurs, groupes, etc.)
├── seed_2026_11.sql              # Réinitialisation des séquences SQL
├── .env.example                  # Exemple de fichier de configuration
└── package.json

```

##  Prérequis

* [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)

* [PostgreSQL](https://www.postgresql.org/) installé et en cours d'exécution

##  Installation et Configuration

1. **Cloner le dépôt** :

   ```
   git clone https://github.com/Monteiro-David/LoveLace.git
   cd back-end
   
   ```

2. **Installer les dépendances** :

   ```
   npm install
   
   ```

3. **Configurer les variables d'environnement** :
   Copiez le fichier `.env.example` vers `.env` et renseignez vos informations (notamment `JWT_SECRET` qui est obligatoire au démarrage) :

   ```
   cp .env.example .env
   
   ```

   Exemple de contenu `.env` :

   ```
   PORT=3000
   FRONT_URL=http://localhost:5173
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=Lovelace
   
   JWT_SECRET=votre_cle_secrete_tres_longue
   
   ```

4. **Lancer le serveur** :

   * En mode développement (avec rechargement automatique via `nodemon`) :

     ```
     npm run dev
     
     ```

   * En mode production :

     ```
     npm start
     
     ```

##  Base de Données

1. Créez une base de données nommée `Lovelace` dans PostgreSQL.

2. Exécutez les scripts SQL dans l'ordre suivant pour initialiser le schéma et les données de test :

   ```
   psql -U votre_utilisateur -d Lovelace -f migration_up.sql
   psql -U votre_utilisateur -d Lovelace -f seed.sql
   psql -U votre_utilisateur -d Lovelace -f seed_2026_11.sql
   
   ```

   *(Pour réinitialiser/supprimer toutes les tables, utilisez `migration_down.sql`)*.

##  Documentation de l'API

###  Test

| Méthode | Endpoint | Description | 

| `GET` | `/api/test/test-db` | Vérifie la connexion à PostgreSQL |

###  Authentification (`/api/auth`)

| Méthode | Endpoint | Description | 

| `POST` | `/api/auth/inscription` | Créer un nouveau compte utilisateur |
| `POST` | `/api/auth/connexion` | Connecter un utilisateur et définir le cookie JWT |
| `GET` | `/api/auth/moi` | Récupérer les informations de l'utilisateur connecté | 
| `POST` | `/api/auth/deconnexion` | Déconnecter l'utilisateur et supprimer le cookie | 

###  Utilisateurs (`/api/utilisateurs`)

| Méthode | Endpoint | Description | 

| `GET` | `/api/utilisateurs/profil/:id` | Récupérer le profil d'un utilisateur par ID | 
| `PUT` | `/api/utilisateurs/profil/:id` | Mettre à jour les informations d'un profil | 

###  Groupes (`/api/groupe`)

*Toutes les routes ci-dessous nécessitent d'être authentifié.*

| Méthode | Endpoint | Description | Permissions | 

| `GET` | `/api/groupe` | Lister les groupes de l'utilisateur connecté | Authentifié | 
| `POST` | `/api/groupe` | Créer un groupe (le créateur devient `admin`) | Authentifié | 
| `GET` | `/api/groupe/:groupe_id` | Détails d'un groupe | Membre | 
| `PUT` | `/api/groupe/:groupe_id` | Modifier un groupe | Admin | 
| `DELETE` | `/api/groupe/:groupe_id` | Supprimer un groupe | Admin | 
| `GET` | `/api/groupe/:groupe_id/membres` | Lister les membres d'un groupe | Membre | 
| `POST` | `/api/groupe/:groupe_id/invitations` | Ajouter/inviter un membre dans le groupe | Admin | 
| `PUT` | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Modifier le rôle d'un membre (`admin`/`membre`) | Admin | 
| `DELETE` | `/api/groupe/:groupe_id/membres/:utilisateur_id` | Quitter le groupe ou retirer un membre | Admin ou Soi-même | 

###  Événements (`/api/evenements`)

*Toutes les routes ci-dessous nécessitent d'être authentifié.*

| Méthode | Endpoint | Description | 

| `GET` | `/api/evenements` | Lister les événements créés ou auxquels l'utilisateur est invité | 
| `POST` | `/api/evenements` | Créer un nouvel événement | 
| `GET` | `/api/evenements/:id_evenement` | Récupérer les détails d'un événement | 
| `PUT` | `/api/evenements/:id_evenement` | Modifier la date, le lieu ou le statut d'un événement | 
| `DELETE` | `/api/evenements/:id_evenement` | Supprimer un événement | 

##  Contributeurs

Ce projet a été développé par :

* **Monteiro David** ([@Monteiro-David](https://github.com/Monteiro-David))

* **Assy Wone** ([@sywone75-png](https://github.com/sywone75-png))

* **Mayulie** ([@Mayulie](https://github.com/Mayulie))