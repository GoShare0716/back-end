INSERT INTO workshop (
    title,
    category,
    requirement,
    target_audience,
    goal
)
VALUES (
    ${title},
    ${category},
    ${requirement},
    ${targetAudience},
    ${goal}
)
RETURNING id;
