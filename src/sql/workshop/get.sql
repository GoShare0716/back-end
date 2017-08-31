SELECT
    w.*,
    u.id               AS author_id,
    u.name             AS author_name,
    u.picture_url      AS author_picture_url,
    u.fb_url           AS author_fb_url,
    u.personal_web_url AS author_personal_web_url,
    u.introduction     AS author_introduction,
    COUNT(a.user_id)::integer AS attendees_number,
    ARRAY_AGG(f.id)            AS friends_id,
    ARRAY_AGG(f.name)          AS friends_name,
    ARRAY_AGG(f.thumbnail_url) AS friends_thumbnail_url,
    (u.id = ${userId}) AS is_author,
    (ma.canceled IS NOT NULL AND NOT ma.canceled) AS attended,
    (ma.canceled IS NOT NULL AND ma.canceled) AS canceled
FROM workshop AS w

-- attendees
LEFT JOIN attend_workshop AS a
ON a.workshop_id = w.id AND a.canceled = false

-- author
INNER JOIN create_workshop AS c
ON c.workshop_id = w.id
INNER JOIN users AS u
ON u.id = c.user_id

-- user's attend
LEFT JOIN attend_workshop AS ma -- my attend
ON ma.workshop_id = w.id AND ma.user_id = ${userId}

-- user's friends
LEFT JOIN users AS f
ON a.user_id = f.id AND f.fb_id IN (${friends:csv})

WHERE w.id = ${workshopId}
GROUP BY
    w.id,
    u.id,
    ma.canceled
;
