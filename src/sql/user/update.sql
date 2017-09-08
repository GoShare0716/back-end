-- user.update
UPDATE users
SET
    access_token = ${accessToken}
WHERE
    fb_id = ${fbId}
RETURNING
    id,
    fb_id,
    access_token,
    role;
