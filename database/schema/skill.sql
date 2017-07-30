CREATE TABLE skill (
    id serial PRIMARY KEY NOT NULL,
    name        text      NOT NULL DEFAULT '',
    category    category  NOT NULL,
    description text      NOT NULL DEFAULT '',
    tag         text[]    NOT NULL DEFAULT ARRAY[]::text[],
    video_url   text      NOT NULL DEFAULT '',
    visible     boolean   NOT NULL DEFAULT FALSE,
    created_at  bigint    NOT NULL DEFAULT (extract(epoch from now())*1000),
    updated_at  bigint    NOT NULL DEFAULT (extract(epoch from now())*1000)
);
