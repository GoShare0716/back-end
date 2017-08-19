UPDATE attend_workshop
SET
    canceled = true
WHERE
    workshop_id = ${workshopId} AND
    user_id = ${userId};
