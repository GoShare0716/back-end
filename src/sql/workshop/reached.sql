-- workshop.reached
UPDATE workshop
SET
    state = 'reached',
    reached_datetime = ${now}
WHERE
    state = 'judge_ac' AND
    min_number <= (
        SELECT COUNT(user_id) AS attendees_number
        FROM attend_workshop
        WHERE
            workshop_id = workshop.id AND
            canceled = false
    )
;
