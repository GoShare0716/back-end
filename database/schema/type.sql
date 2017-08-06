CREATE TYPE level AS enum (
    'none',
    'basic',
    'advanced'
);

CREATE TYPE category AS enum (
    'null',
    'technology',
    'aesthetics'
);

CREATE TYPE state AS enum (
    'judging',
    'judge_na',
    'judge_ac',
    'reached',
    'unreached'
);

CREATE TYPE role AS enum (
    'member',
    'admin'
);
