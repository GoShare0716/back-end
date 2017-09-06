-- user.vote-skills
SELECT *
FROM vote_skill
INNER JOIN skill
ON vote_skill.skill_id = skill.id
WHERE vote_skill.user_id = $(userId);
