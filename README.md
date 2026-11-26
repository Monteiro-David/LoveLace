# Joya

## 1. Le projet

**Joya** est une application web collaborative qui permet d'organiser des événements avec ses proches, ses amis ou ses collègues.

L'objectif est de centraliser l'organisation des événements au même endroit : création de groupes, gestion des membres, invitations et organisation des événements.

### Fonctionnalités développées

- **Authentification et gestion des profils :** inscription, connexion et gestion du profil utilisateur.
- **Création et gestion des groupes :** création et administration de groupes.
- **Gestion des membres et invitations :** ajout, gestion des membres et invitations à rejoindre un groupe.
- **Création et gestion des événements :** organisation et gestion des événements au sein des groupes.

Le projet évolue progressivement dans le cadre de notre formation en développement et DevOps.

## 2. Stack technique

### Frontend

- **React 19** : bibliothèque JavaScript pour construire l'interface utilisateur.
- **Vite** : outil de développement et de compilation.
- **React Router DOM** : gestion de la navigation.
- **ESLint** : analyse et vérification du code.

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

- **Docker** : conteneurisation des services.
- **Docker Compose** : orchestration du frontend, du backend et de la base de données.
- **GitHub Actions** : mise en place progressive de l'intégration continue (CI).

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
```

## 4. Installation

### 4.1 Cloner le projet

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

```bash
cp Back-end/.env.example Back-end/.env
```

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

```bash
docker compose up -d --build
```

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

```bash
docker compose logs -f
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

## 6. Scripts disponibles

### Backend

Depuis le dossier `Back-end/` :

| Commande      | Description                                            |
| ------------- | ------------------------------------------------------ |
| `npm run dev` | Démarre le serveur en mode développement avec Nodemon. |
| `npm start`   | Démarre le serveur en mode production.                 |

### Frontend

Depuis le dossier `Front-end/` :

| Commande          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Démarre le serveur Vite en mode développement. |
| `npm run build`   | Compile l'application pour la production.      |
| `npm run preview` | Prévisualise la version compilée.              |
| `npm run lint`    | Analyse le code avec ESLint.                   |

Le lancement habituel de l'ensemble du projet se fait avec Docker Compose depuis la racine.

## 7. Dépendances du projet

Les dépendances sont gérées séparément pour le frontend et le backend.

### Backend

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

### Frontend

Les principales dépendances sont :

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
