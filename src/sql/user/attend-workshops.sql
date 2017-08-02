SELECT *
FROM attend_workshop
INNER JOIN workshop
ON attend_workshop.workshop_id = workshop.id
WHERE attend_workshop.user_id = $(userId);
