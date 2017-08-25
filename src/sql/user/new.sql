INSERT INTO users (
    fb_id,
    access_token,
    name,
    email,
    thumbnail_url,
    picture_url
)
VALUES (
    ${fbId},
    ${accessToken},
    ${name},
    ${email},
    ${thumbnailUrl},
    ${pictureUrl}
)
RETURNING
    fb_id,
    access_token,
    role;
