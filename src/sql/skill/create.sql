INSERT INTO create_skill (
    user_id,
    skill_id
)
VALUES (
    ${userId},
    ${skillId}
)
RETURNING skill_id;
