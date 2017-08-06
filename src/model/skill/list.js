const R = require('ramda')

const db = require('src/db')
const { whereClause } = require('src/utils').sql

module.exports = (userId, query) => {
  const order = R.cond([
    [R.equals('hot'), R.always('basic_number DESC')],
    [R.T, R.always('name')]
  ])(query.ordering)

  const conditions = []

  if (query.searchText === '') {
    conditions.push('visible = true')
  } else {
    // conditions.push('visible = false')
    conditions.push(`name ILIKE '%$(searchText:value)%'`)
  }

  if (query.category !== 'all') {
    conditions.push('category = $(category)')
  }

  const sql = `
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
      coalesce(uv.level, 'none') AS vote_level,
      coalesce(ue.level, 'none') AS equip_level,
      COUNT(v.level = 'basic') AS basic_number,
      COUNT(v.level = 'advanced') AS advanced_number
    FROM skill AS s
    LEFT JOIN vote_skill AS v
    ON v.skill_id = s.id
    LEFT JOIN vote_skill AS uv
    ON uv.skill_id = s.id AND uv.user_id = $(userId)
    LEFT JOIN equip_skill AS ue
    ON ue.skill_id = s.id AND ue.user_id = $(userId)
    ${whereClause(conditions)}
    GROUP BY
      s.id,
      uv.level,
      ue.level
    ORDER BY ${order}
    ;`

  return db.task(t => {
    return t.any(sql, R.merge(query, {userId}))
  })
}
