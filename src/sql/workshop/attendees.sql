-- workshop.attendees
SELECT
    u.*,
    (a.canceled IS NOT NULL AND NOT a.canceled) AS attended,
    (a.canceled IS NOT NULL AND a.canceled) AS canceled
FROM
    attend_workshop AS a
INNER JOIN users AS u
ON u.id = a.user_id
WHERE
    a.workshop_id = ${workshopId};
