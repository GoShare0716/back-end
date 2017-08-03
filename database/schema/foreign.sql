-- ON DELETE CASCADE:
-- will delete all rows in the foreign table
-- that are referenced to the rows that are being deleted in the origin table
CREATE TABLE create_workshop (
    user_id     serial REFERENCES users(id)    ON DELETE CASCADE,
    workshop_id serial REFERENCES workshop(id) ON DELETE CASCADE,
    created_at  bigint  NOT NULL DEFAULT (extract(epoch from now())*1000)
);

CREATE TABLE attend_workshop (
    user_id     serial REFERENCES users(id)    ON DELETE CASCADE,
    workshop_id serial REFERENCES workshop(id) ON DELETE CASCADE,
    created_at  bigint  NOT NULL DEFAULT (extract(epoch from now())*1000),
    canceled    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE create_skill (
    user_id    serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id   serial REFERENCES skill(id) ON DELETE CASCADE,
    created_at bigint NOT NULL DEFAULT (extract(epoch from now())*1000)
);

CREATE TABLE vote_skill (
    user_id    serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id   serial REFERENCES skill(id) ON DELETE CASCADE,
    created_at bigint NOT NULL DEFAULT (extract(epoch from now())*1000),
    level      level  NOT NULL
);

CREATE TABLE equip_skill (
    user_id    serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id   serial REFERENCES skill(id) ON DELETE CASCADE,
    created_at bigint NOT NULL DEFAULT (extract(epoch from now())*1000),
    level      level  NOT NULL
)
