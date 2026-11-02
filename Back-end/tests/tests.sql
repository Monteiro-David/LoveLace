--  SELECT *
--  From utilisateur

-- SELECT * 
-- FROM utilisateur
-- WHERE id = $1

-- -- SELECT *
-- -- From groupe

-- SELECT g.*
-- FROM groupe g 
-- JOIN utilisateur_groupe ug ON g.id = ug.groupe_id 
-- WHERE ug.utilisateur_id = $1
-- ORDER BY g.date_creation DESC

-- SELECT * 
-- FROM groupe 
-- WHERE id = $1

-- SELECT u.id, u.nom, u.prenom, u.pseudo, u.email, ug.role 
-- FROM utilisateur u
-- JOIN utilisateur_groupe ug ON u.id = ug.utilisateur_id
-- WHERE ug.groupe_id = $1

-- SELECT *
-- FROM notification

-- SELECT *
-- FROM evenement

-- SELECT *
-- FROM tache

-- SELECT *
-- FROM invitation

-- SELECT *
-- FROM proposition_vote

-- SELECT *
-- FROM utilisateur_groupe