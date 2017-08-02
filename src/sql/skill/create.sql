INSERT INTO skill (
    name,
    category
)
VALUES (
    ${name},
    ${category}
)
RETURNING id;

