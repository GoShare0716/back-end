SELECT
  w.id,
  w.state,
  w.image_url,
  w.title,
  w.min_number,
  w.max_number,
  w.deadline,
  w.closing,
  w.start_datetime,
  w.pre_price,
  w.price,
  w.published, --- filter usage, not for api
  COUNT(a.user_id)::integer AS attendees_number,
  u.id               AS author_id,
  u.name             AS author_name,
  u.picture_url      AS author_picture_url,
  u.fb_url           AS author_fb_url,
  u.personal_web_url AS author_personal_web_url,
  u.introduction     AS author_introduction
FROM workshop AS w
LEFT JOIN attend_workshop AS a
ON a.workshop_id = w.id AND a.canceled = false
INNER JOIN create_workshop AS c
ON c.workshop_id = w.id
INNER JOIN users AS u
ON u.id = c.user_id
WHERE
    a.user_id = ${userId} AND
    w.published = true AND
    w.state NOT IN ('judging', 'judge_na')
GROUP BY
  w.id,
  u.id;
