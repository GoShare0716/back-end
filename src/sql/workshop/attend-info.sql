SELECT
    (canceled IS NOT NULL AND NOT canceled) AS attended,
    (canceled IS NOT NULL AND canceled) AS canceled
FROM attend_workshop
WHERE
    workshop_id = ${workshopId} AND
    user_id = ${userId};
