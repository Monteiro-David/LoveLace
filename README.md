# Joya 💎

## Sommaire

- [1. Le projet](#1-le-projet)
- [2. Stack technique](#2-stack-technique)
- [3. Prérequis](#3-prérequis)
- [4. Installation](#4-installation)
- [5. Lancer le projet](#5-lancer-le-projet)
- [6. Scripts disponibles](#6-scripts-disponibles)
- [7. Dépendances du projet](#7-dépendances-du-projet)
- [8. Structure du projet](#8-structure-du-projet)
- [9. Tests et données de test](#9-tests-et-données-de-test)
- [10. Dépannage](#10-dépannage)
- [11. Contribuer](#11-contribuer)
- [12. Équipe](#12-équipe)

## 1. Le projet

Joya est une application web collaborative qui permet d'organiser des
événements avec ses proches, ses amis ou ses collègues.

L'objectif est de centraliser l'organisation des événements au même
endroit : création de groupes, gestion des membres, invitations et
organisation des événements.

### Fonctionnalités développées

- **Authentification et gestion des profils :** inscription, connexion
  et gestion du profil utilisateur.
- **Création et gestion des groupes :** création et administration de
  groupes.
- **Gestion des membres et invitations :** ajout, gestion des membres
  et invitations à rejoindre un groupe.
- **Création et gestion des événements :** organisation et gestion des
  événements au sein des groupes.

Le projet évolue progressivement dans le cadre de notre formation en
développement et DevOps.

## 2. Stack technique

### Frontend

- **React 19 :** bibliothèque JavaScript pour construire l'interface
  utilisateur.
- **Vite :** outil de développement et de compilation.
- **React Router DOM :** gestion de la navigation.
- **ESLint :** analyse et vérification du code.

### Backend

- **Node.js :** environnement d'exécution JavaScript.
- **Express 5 :** framework pour construire l'API REST.
- **PostgreSQL 16 :** système de gestion de base de données
  relationnelle.
- **node-postgres (`pg`) :** connexion entre le backend et PostgreSQL.
- **JWT :** gestion des jetons d'authentification.
- **bcryptjs :** hachage et vérification des mots de passe.
- **cookie-parser :** lecture des cookies HTTP.
- **dotenv :** chargement des variables d'environnement.
- **CORS :** gestion des échanges entre frontend et backend.

### DevOps

- **Docker :** conteneurisation des services.
- **Docker Compose :** orchestration du frontend, du backend et de la
  base de données.
- **GitHub Actions :** mise en place progressive de l'intégration
  continue (CI).

La démarche DevOps est enrichie au fur et à mesure de notre
apprentissage.

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

Le backend a besoin d'un fichier `.env` pour connaître sa configuration.
Ce fichier doit être créé localement dans `Back-end/` à partir du modèle
fourni.

Depuis la racine du projet, exécuter :

```bash
cp Back-end/.env.example Back-end/.env
```

Ouvrir ensuite `Back-end/.env` et remplacer les valeurs d'exemple par
les valeurs de votre environnement :

```env


# Configuration PostgreSQL
DB_HOST=database
DB_PORT=5432
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=Lovelace

# Secret utilisé pour signer et vérifier les JWT
JWT_SECRET=remplacer_par_un_secret_long_et_aleatoire

# Origine du frontend (facultatif en développement local)
FRONT_URL=http://localhost:5173
```

#### Rôle des variables

---

Variable Description

---

`DB_HOST` Hôte PostgreSQL. Utiliser
`database` depuis le conteneur
backend.

`DB_PORT` Port PostgreSQL. Obligatoire.

`DB_USER` Utilisateur PostgreSQL.

`DB_PASSWORD` Mot de passe de cet utilisateur
PostgreSQL.

`DB_NAME` Nom de la base de données.

`JWT_SECRET` Secret privé utilisé pour signer et
vérifier les jetons JWT.

`FRONT_URL` Origine autorisée du frontend pour
CORS. Si elle n'est pas définie, le
backend utilise
`http://localhost:5173`.

---

Les variables `DB_PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`,
`DB_NAME` et `JWT_SECRET` doivent être renseignées. Le backend vérifie
la présence de la variable obligatoire et contrôle que
`DB_PORT` soit un numéro de port valide. En cas de variable manquante
ou de port invalide, le démarrage du backend est interrompu avec un
message d'erreur.

#### Générer le secret JWT

Ne pas utiliser une valeur facile à deviner telle que `ton_secret` ou
`123456`. Pour générer un secret aléatoire avec OpenSSL :

```bash
openssl rand -base64 64
```

Copier le résultat dans `JWT_SECRET` du fichier `Back-end/.env`.

**Sécurité :** - Le fichier `.env` contient des informations sensibles :
ne pas le partager et ne pas le committer. - Ne jamais écrire le secret
JWT directement dans le code source. - Ne jamais publier le contenu du
fichier `.env` dans un dépôt Git, une capture d'écran ou un journal. -
Le fichier `.env.example` est un modèle : il ne doit contenir que des
valeurs fictives. - En production, stocker les secrets dans le mécanisme
de gestion des secrets de l'environnement de déploiement. - Si le secret
JWT est compromis, le remplacer. Les jetons signés avec l'ancien secret
ne seront alors plus vérifiables avec le nouveau.

Le JWT (_JSON Web Token_) est un jeton signé par le backend après
authentification. Le backend utilise `JWT_SECRET` pour signer le jeton
et vérifier son authenticité lors des requêtes protégées. Le secret
reste exclusivement côté serveur : il ne doit jamais être envoyé au
frontend.

#### Attention à la configuration Docker

Le fichier `docker-compose.yml` utilise les variables `${DB_USER}`,
`${DB_PASSWORD}` et `${DB_NAME}` pour configurer PostgreSQL. Le
`env_file` du service backend transmet les variables au conteneur
backend, mais ne fournit pas à lui seul les valeurs utilisées pour
l'interpolation du fichier Compose.

C'est pourquoi le lancement du projet doit préciser le fichier
d'environnement avec `--env-file Back-end/.env` (voir la commande de
lancement ci-dessous).

Dans Docker Compose, `DB_HOST=database` permet au backend de joindre
PostgreSQL grâce au nom du service `database`. Pour une connexion depuis
la machine hôte, l'adresse est `localhost` avec le port publié `5432`.

## 5. Lancer le projet

Le projet utilise Docker Compose pour démarrer les trois services.

Depuis la racine du projet :

```bash
docker compose up -d --build
```

Cette commande :

- construit les images Docker du frontend et du backend ;
- démarre le conteneur PostgreSQL ;
- démarre le backend ;
- démarre le frontend.

### Ports utilisés

Les ports sont nécessaires au fonctionnement et à l'accès aux services.
La configuration actuelle utilise :

Service Port du service Port publié sur la machine

---

Frontend Vite `5173` `5173`
Backend Express `3000` (`PORT=3000`) `3000`
PostgreSQL `5432` `5432`

Si un port est modifié dans `.env` ou dans `docker-compose.yml`, les
configurations qui en dépendent doivent être mises à jour ensemble. En
particulier, le port d'écoute du backend (`PORT`) doit correspondre au
port cible publié par Docker Compose.

### Accéder à l'application

Une fois les conteneurs démarrés :

Service Adresse

---

Frontend http://localhost:5173
Backend http://localhost:3000
PostgreSQL `localhost:5432`

### Initialiser la base de données

L'initialisation de la base de données est effectuée manuellement.

Une fois le conteneur PostgreSQL démarré, exécuter la migration :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/migration/migration_up.sql
```

Remplacer `<DB_USER>` et `<DB_NAME>` par les valeurs renseignées dans
`Back-end/.env`.

Exécuter ensuite les scripts de seed :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/seeds/seed.sql
```

Si le projet utilise également le jeu de données complémentaire :

```bash
docker exec -i Lovelace_db psql -U <DB_USER> -d <DB_NAME> < Back-end/database/seeds/seed_2026_11.sql
```

Ces scripts permettent de créer la structure de la base de données et
d'insérer les données nécessaires au fonctionnement de l'application.

**Attention :** les migrations et les seeds doivent être exécutés dans
le bon ordre. Le script `seed.sql` commence par vider plusieurs tables
(`TRUNCATE ... RESTART IDENTITY CASCADE`) : son exécution réinitialise
donc les données concernées. Ne pas l'exécuter sur une base contenant
des données à conserver.

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

Pour arrêter les conteneurs et supprimer également le volume de données
PostgreSQL :

```bash
docker compose down -v
```

**Attention :** cette dernière commande supprime les données stockées
dans le volume de la base de données.

## 6. Scripts disponibles

### Backend

Depuis le dossier `Back-end/` :

---

Commande Description

---

`npm run dev` Démarre le serveur en mode
développement avec Nodemon.

`npm start` Démarre le serveur en mode
classique.

---

### Frontend

Depuis le dossier `Front-end/` :

Commande Description

---

`npm run dev` Démarre le serveur Vite en mode développement.
`npm run build` Compile l'application pour la production.
`npm run preview` Prévisualise la version compilée.
`npm run lint` Analyse le code avec ESLint.

Le lancement habituel de l'ensemble du projet se fait avec Docker
Compose depuis la racine.

## 7. Dépendances du projet

Les dépendances sont gérées séparément pour le frontend et le backend.

### Backend

Les principales dépendances sont :

- `express` : création de l'API.
- `pg` : connexion à PostgreSQL.
- `bcryptjs` : hachage et vérification des mots de passe.
- `jsonwebtoken` : gestion des jetons JWT.
- `cookie-parser` : lecture des cookies.
- `cors` : gestion des requêtes cross-origin.
- `dotenv` : chargement des variables d'environnement.
- `nodemon` : redémarrage automatique du serveur en développement.
- `jest` : bibliothèque installée pour les tests backend.

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

Cette structure présente les principaux dossiers du projet. Certains
sous-dossiers peuvent évoluer au fil du développement.

## 9. Tests et données de test

### Données fournies par les seeds

Le fichier `Back-end/database/seeds/seed.sql` insère notamment deux
utilisateurs de démonstration :

Prénom et nom Adresse e-mail Mot de passe présent dans le seed

---

John Doe `john.doe@example.com` `password123`
Jane Smith `jane.smith@example.com` `password456`

Le seed insère également des groupes, des appartenances à ces groupes,
des événements, des invitations, des propositions de vote, des tâches et
des notifications.

**Important concernant la connexion :** dans le seed fourni, les mots de
passe sont enregistrés tels quels. Or, le service d'inscription utilise
`bcryptjs` pour hacher les mots de passe et le service de connexion
compare le mot de passe fourni à un hash avec `bcrypt.compare`. Les deux
mots de passe indiqués dans le tableau ne sont donc pas garantis comme
utilisables pour se connecter avec le mécanisme actuel. Ils décrivent
les valeurs du jeu de données SQL, pas des identifiants de connexion
validés.

Pour tester une connexion, créer un compte avec le formulaire ou
l'endpoint d'inscription de l'application, puis utiliser les mêmes
identifiants dans le formulaire de connexion.

### Vérifications fonctionnelles de l'authentification

Les scénarios suivants sont à vérifier manuellement :

---

Scénario Résultat attendu

---

Inscription avec tous les champs Le compte est créé.
requis et un e-mail disponible

Inscription sans un champ L'API renvoie une erreur de
obligatoire validation.

Inscription avec un e-mail déjà L'API refuse la création du
utilisé doublon.

Connexion avec un e-mail et un mot L'authentification réussit.
de passe valides

Connexion avec un mot de passe L'API refuse l'authentification.
incorrect

Connexion sans e-mail ou sans mot L'API renvoie une erreur de
de passe validation.

Accès à une route protégée sans L'accès est refusé.
jeton valide

Accès à une route protégée avec un La requête est autorisée selon les
jeton valide droits de l'utilisateur.

---

### Tests automatisés

Jest figure parmi les dépendances du backend, mais aucun script de test
n'est actuellement déclaré dans `Back-end/package.json`. Les scénarios
ci-dessus sont donc une liste de vérifications fonctionnelles à réaliser
; ils ne signifient pas que des tests automatisés de connexion sont déjà
implémentés.

Les tests automatisés de l'inscription et de la connexion restent à
ajouter. Une fois les tests et leur script configurés, cette section
devra être complétée avec la commande exacte pour les exécuter.

## 10. Dépannage

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
- `DB_HOST` correspond au nom du service Docker, soit `database`,
  lorsque le backend tourne dans Docker.
- Les variables d'environnement sont correctement renseignées.
- Le fichier `Back-end/.env` est bien utilisé au lancement de Docker
  Compose avec `--env-file`.

### Le frontend ne communique pas avec le backend

Vérifier que les trois conteneurs sont actifs :

```bash
docker compose ps
```

Vérifier également la configuration du proxy Vite et la variable
`VITE_API_TARGET`.

### Le port est déjà utilisé

Si un port est déjà occupé, identifier le processus qui l'utilise avant
de relancer Docker.

Par exemple :

```bash
lsof -i :3000
lsof -i :5173
lsof -i :5432
```

## 11. Contribuer

Les contributions au projet sont organisées avec Git et GitHub.

Nous utilisons une organisation basée sur les branches et les Pull
Requests.

### Workflow de contribution

1.  Se placer sur la branche principale et récupérer les dernières
    modifications :

    ```bash
    git switch master
    git pull origin master
    ```

2.  Créer une branche dédiée à sa fonctionnalité ou à sa correction :

    ```bash
    git switch -c feat/nom-de-la-fonctionnalite
    ```

3.  Développer et tester ses modifications.

4.  Ajouter et committer les changements :

    ```bash
    git add .
    git commit -m "feat: description de la fonctionnalité"
    ```

5.  Envoyer sa branche sur GitHub :

    ```bash
    git push -u origin feat/nom-de-la-fonctionnalite
    ```

6.  Ouvrir une Pull Request vers `master`.

7.  Faire relire et valider les modifications avant leur fusion.

### Convention de commits

Nous utilisons les préfixes suivants :

Préfixe Utilisation

---

`feat:` Ajout d'une fonctionnalité
`fix:` Correction d'un bug
`docs:` Modification de la documentation
`refactor:` Réorganisation du code
`test:` Ajout ou modification de tests
`chore:` Maintenance et configuration

## 12. Équipe

Projet réalisé dans le cadre de notre formation en développement web et
DevOps.

---

Collaborateur GitHub

---

Monteiro David [@Monteiro-David](https://github.com/Monteiro-David)

Assy Wone [@sywone75-png](https://github.com/sywone75-png)

Mayulie [@Mayulie](https://github.com/Mayulie)

---

---

**Joya --- Organiser ensemble, simplement.**
