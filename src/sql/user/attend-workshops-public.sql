SELECT
    workshop.*
FROM attend_workshop
INNER JOIN workshop
ON attend_workshop.workshop_id = workshop.id
WHERE
    attend_workshop.user_id = $(userId) AND
    workshop.published = true AND
    workshop.state NOT IN ('judging', 'judge_na');
