CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    image_profil VARCHAR(255),
    mot_de_passe VARCHAR(100) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Groupe (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Utilisateur_Groupe (
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE,
    groupe_id INT REFERENCES Groupe(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    date_adhesion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (utilisateur_id, groupe_id)
);

CREATE TABLE Evenement (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    lieu VARCHAR(255),
    description TEXT,
    categorie VARCHAR(50),
    status_final VARCHAR(50) DEFAULT 'en attente' 
        CHECK (status_final IN ('confirmé', 'annulé', 'en attente')),
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE,
    groupe_id INT REFERENCES Groupe(id) ON DELETE CASCADE
);

CREATE TABLE Invitation (
    id SERIAL PRIMARY KEY,
    statut VARCHAR(50) DEFAULT 'en attente' 
        CHECK (statut IN ('accepté', 'refusé', 'en attente')),
    type VARCHAR(50) DEFAULT 'evenement' 
        CHECK (type IN ('groupe', 'evenement')),
    date_invitation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_limite_reponse TIMESTAMP,
    groupe_id INT REFERENCES Groupe(id) ON DELETE CASCADE,
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE,
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE
);

CREATE TABLE Tache (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    statut VARCHAR(50) DEFAULT 'en cours' 
        CHECK (statut IN ('en cours', 'terminé', 'en attente', 'en retard')),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_echeance TIMESTAMP,
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE,
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE
);

CREATE TABLE PropositionVote (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) DEFAULT 'date' 
        CHECK (type IN ('date', 'lieu')),
    valeur VARCHAR(255) NOT NULL,
    nb_votes INT DEFAULT 0,
    evenement_id INT REFERENCES Evenement(id) ON DELETE CASCADE
);

CREATE TABLE Notification (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) DEFAULT 'invitation' 
        CHECK (type IN ('groupe', 'evenement', 'tache', 'invitation', 'retard', 'validation','reussite')),
    objet_type VARCHAR(50) 
        CHECK (objet_type IN ('groupe', 'evenement', 'tache', 'invitation')),
    objet_id INT,
    contenu TEXT NOT NULL,
    lue BOOLEAN DEFAULT FALSE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    utilisateur_id INT REFERENCES Utilisateur(id) ON DELETE CASCADE
);