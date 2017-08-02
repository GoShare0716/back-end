CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    role             role        NOT NULL DEFAULT 'member',
    name             text        NOT NULL DEFAULT '',
    email            text        NOT NULL DEFAULT '',
    fb_id            text        NOT NULL DEFAULT '',
    access_token     text        NOT NULL DEFAULT '',
    thumbnail_url    text        NOT NULL DEFAULT '',
    picture_url      text        NOT NULL DEFAULT '',
    introduction     text        NOT NULL DEFAULT '',
    fb_url           text        NOT NULL DEFAULT '',
    personal_web_url text        NOT NULL DEFAULT '',
    available        boolean[21] NOT NULL DEFAULT (ARRAY_FILL(FALSE, ARRAY[21])),
    created_at       bigint      NOT NULL DEFAULT (extract(epoch from now())*1000)
);
CREATE INDEX user_created_at_index ON users USING btree(created_at);
