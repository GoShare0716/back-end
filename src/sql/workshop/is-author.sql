-- user.is-author
SELECT
    (u.id = ${userId}) AS is_author
FROM create_workshop AS c
INNER JOIN users AS u
ON c.user_id = u.id
WHERE c.workshop_id = ${workshopId};
