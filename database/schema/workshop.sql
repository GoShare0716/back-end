CREATE TABLE workshop (
    id               serial   NOT NULL PRIMARY KEY,
    title            text     NOT NULL DEFAULT '',
    requirement      text[]   NOT NULL DEFAULT ARRAY[]::text[],
    target_audience  text[]   NOT NULL DEFAULT ARRAY[]::text[],
    goal             text[]   NOT NULL DEFAULT ARRAY[]::text[],
    image_url        text     NOT NULL DEFAULT '',
    description      text     NOT NULL DEFAULT '',
    content          text     NOT NULL DEFAULT '',
    attended_msg     text     NOT NULL DEFAULT '',
    location         text     NOT NULL DEFAULT '',
    category         category NOT NULL,
    state            state    NOT NULL DEFAULT 'judging',
    price            integer  NOT NULL DEFAULT 0,
    pre_price        integer  NOT NULL DEFAULT 0,
    min_number       integer  NOT NULL DEFAULT 0,
    max_number       integer  NOT NULL DEFAULT 0,
    published        boolean  NOT NULL DEFAULT FALSE,
    deadline         bigint   NOT NULL DEFAULT 0,
    closing          bigint   NOT NULL DEFAULT 0,
    start_datetime   bigint   NOT NULL DEFAULT 0,
    end_datetime     bigint   NOT NULL DEFAULT 0,
    reached_datetime bigint   NOT NULL DEFAULT 0,
    created_at       bigint   NOT NULL DEFAULT (extract(epoch from now())*1000),
    updated_at       bigint   NOT NULL DEFAULT (extract(epoch from now())*1000)
);

CREATE INDEX workshop_created_at_index ON workshop USING btree(created_at);
CREATE INDEX workshop_start_datetime_index ON workshop USING btree(start_datetime);
