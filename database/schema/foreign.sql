-- ON DELETE CASCADE:
-- will delete all rows in the foreign table
-- that are referenced to the rows that are being deleted in the origin table
CREATE TABLE create_workshop (
    user_id     serial REFERENCES users(id)    ON DELETE CASCADE,
    workshop_id serial REFERENCES workshop(id) ON DELETE CASCADE
);

CREATE TABLE attend_workshop (
    user_id     serial REFERENCES users(id)    ON DELETE CASCADE,
    workshop_id serial REFERENCES workshop(id) ON DELETE CASCADE,
    canceled    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE create_skill (
    user_id  serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id serial REFERENCES skill(id) ON DELETE CASCADE
);

CREATE TABLE vote_skill (
    user_id  serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id serial REFERENCES skill(id) ON DELETE CASCADE,
    level    level  NOT NULL
);

CREATE TABLE equip_skill (
    user_id  serial REFERENCES users(id) ON DELETE CASCADE,
    skill_id serial REFERENCES skill(id) ON DELETE CASCADE,
    level    level  NOT NULL
)
