TRUNCATE TABLE notification, proposition_vote, tache, invitation, utilisateur_groupe, evenement, groupe, utilisateur RESTART IDENTITY CASCADE;

INSERT INTO utilisateur (id, nom, prenom, email, pseudo, image_profil, mot_de_passe, date_creation) VALUES
(1, 'Doe', 'John', 'john.doe@example.com', 'johndoe', NULL, 'password123', CURRENT_TIMESTAMP),
(2, 'Smith', 'Jane', 'jane.smith@example.com', 'janesmith', NULL, 'password456', CURRENT_TIMESTAMP);

INSERT INTO groupe (id, titre, description, date_creation) VALUES
(1, 'Groupe A', 'Description du Groupe A', CURRENT_TIMESTAMP),
(2, 'Groupe B', 'Description du Groupe B', CURRENT_TIMESTAMP);

INSERT INTO utilisateur_groupe (utilisateur_id, groupe_id, role, date_adhesion) VALUES
(1, 1, 'admin', CURRENT_TIMESTAMP),
(2, 1, 'membre', CURRENT_TIMESTAMP),
(2, 2, 'admin', CURRENT_TIMESTAMP);

INSERT INTO evenement (id, titre, date, lieu, description, categorie, status_final, utilisateur_id, groupe_id) VALUES
(1, 'Soirée Jeux de Société', '2026-10-25 19:30:00', 'Chez John', 'Description de l''evenement 1', 'Loisirs', 'confirmé', 1, 1),
(2, 'Soirée Cinéma', '2026-10-27 20:00:00', 'Lieu 2', 'Description de l''evenement 2', 'Loisirs', 'en attente', 2, 2);

INSERT INTO invitation (id, statut, type, date_invitation, date_limite_reponse, groupe_id, evenement_id, utilisateur_id) VALUES
(1, 'en attente', 'evenement', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days', NULL, 1, 2),
(2, 'en attente', 'groupe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days', 1, NULL, 2);

INSERT INTO proposition_vote (id, type, valeur, nb_votes, evenement_id) VALUES
(1, 'date', '2026-11-14 au 2026-11-16', 2, 1),
(2, 'date', '2026-11-21 au 2026-11-23', 1, 1),
(3, 'lieu', 'Chez John', 2, 1),
(4, 'lieu', 'Chez Jane', 0, 1);

INSERT INTO tache (id, titre, description, statut, date_creation, date_echeance, utilisateur_id, evenement_id) VALUES
(1, 'Préparer les jeux', 'Ramener les jeux de société', 'en cours', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 days', 1, 1),
(2, 'Acheter les snacks', 'Acheter les snacks pour la soirée', 'en attente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '5 days', 2, 2);

INSERT INTO notification (id, type, objet_type, objet_id, contenu, lue, utilisateur_id) VALUES
(1, 'invitation', 'evenement', 1, 'Vous avez une nouvelle invitation à un événement.', FALSE, 2),
(2, 'retard', 'tache', 2, 'Votre tâche est en retard.', FALSE, 1);
