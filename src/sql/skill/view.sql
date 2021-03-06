SELECT
    s.id,
    s.name,
    s.category,
    s.description,
    s.tag,
    s.video_url,
    s.visible,
    s.created_at,
    s.updated_at,
    COUNT(v.level = 'basic'   )::integer AS vote_basic_number,
    COUNT(v.level = 'advanced')::integer AS vote_advanced_number,
    COUNT(e.level = 'basic'   )::integer AS equip_basic_number,
    COUNT(e.level = 'advanced')::integer   AS equip_advanced_number,
    coalesce(ue.level, 'none') AS equip_level,
    coalesce(uv.level, 'none') AS vote_level
FROM skill AS s
LEFT JOIN vote_skill AS v
ON v.skill_id = s.id
LEFT JOIN equip_skill AS e
ON e.skill_id = s.id
LEFT JOIN equip_skill AS ue
ON ue.skill_id = s.id AND ue.user_id = ${userId}
LEFT JOIN vote_skill AS uv
ON uv.skill_id = s.id AND uv.user_id = ${userId}
WHERE s.id = ${skillId}
GROUP BY
    s.id,
    uv.level,
    ue.level
