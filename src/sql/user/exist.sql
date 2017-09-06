-- user.exist
SELECT
    id,
    fb_id,
    access_token,
    role
FROM users
WHERE fb_id = ${fbId};
