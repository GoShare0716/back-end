-- user.user-login.info
SELECT *
FROM users
WHERE fb_id = ${fbId} AND access_token = ${accessToken};
