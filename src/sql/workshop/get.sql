SELECT
    w.*,
    COUNT(a.user_id)::integer AS attendees_number,
    u.id               AS author_id,
    u.name             AS author_name,
    u.picture_url      AS author_picture_url,
    u.fb_url           AS author_fb_url,
    u.personal_web_url AS author_personal_web_url,
    u.introduction     AS author_introduction,
    (u.id = ${userId}) AS is_author,
    (ma.canceled IS NOT NULL AND NOT ma.canceled) AS attended,
    (ma.canceled IS NOT NULL AND ma.canceled) AS canceled
FROM workshop AS w
LEFT JOIN attend_workshop AS a
ON a.workshop_id = w.id AND a.canceled = false
INNER JOIN create_workshop AS c
ON c.workshop_id = w.id
INNER JOIN users AS u
ON u.id = c.user_id
LEFT JOIN attend_workshop AS ma
ON ma.workshop_id = w.id AND ma.user_id = ${userId}
WHERE w.id = ${workshopId}
GROUP BY
    w.id,
    u.id,
    ma.canceled
;
