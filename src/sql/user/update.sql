UPDATE users
SET
    access_token = ${accessToken},
    name = ${name},
    email = ${email},
    thumbnail_url = ${thumbnailUrl},
    picture_url = ${pictureUrl}
WHERE
    fb_id = ${fbId}
RETURNING
    fb_id,
    access_token,
    role;
