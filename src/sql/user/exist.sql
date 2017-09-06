-- user.exist
SELECT
    id
FROM users
WHERE fb_id = ${fbId};
