SELECT *
FROM equip_skill
INNER JOIN skill
ON equip_skill.skill_id = skill.id
WHERE equip_skill.user_id = $(userId);
