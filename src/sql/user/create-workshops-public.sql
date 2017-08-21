SELECT
    workshop.*
FROM create_workshop
INNER JOIN workshop
ON create_workshop.workshop_id = workshop.id
WHERE
    create_workshop.user_id = $(userId) AND
    workshop.published = true AND
    workshop.state NOT IN ('judging', 'judge_na');
