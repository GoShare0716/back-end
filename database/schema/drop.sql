-- FOREIGN TABLE
DROP TABLE IF EXISTS create_workshop;
DROP TABLE IF EXISTS attend_workshop;
DROP TABLE IF EXISTS create_skill;
DROP TABLE IF EXISTS vote_skill;
DROP TABLE IF EXISTS equip_skill;
-- MAIN TABLE
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workshop;
DROP TABLE IF EXISTS skill;
-- TYPE
DROP TYPE IF EXISTS level;
DROP TYPE IF EXISTS category;
DROP TYPE IF EXISTS state;
DROP TYPE IF EXISTS role;
-- INDEX
DROP INDEX IF EXISTS user_created_at_index;
DROP INDEX IF EXISTS workshop_created_at_index;
DROP INDEX IF EXISTS workshop_start_datetime_index;
