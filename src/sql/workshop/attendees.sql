SELECT
    u.*
FROM
    attend_workshop AS a
INNER JOIN users AS u
ON u.id = a.user_id
WHERE
    a.workshop_id = ${workshopId};
