const R = require('ramda')

const db = require('src/db')
const utils = require('src/utils')

module.exports = function (userId, query) {
  // TODO state filter
  // TODO pagination
  // field: author, friends, phase

  const order = R.cond([
    [R.equals('hot'), R.always('attendees_number DESC')],
    [R.equals('date'), R.always('start_datetime DESC')],
    [R.T, R.always('created_at DESC')] // new
  ])(query.ordering)

  const conditions = []
  if (query.searchText !== '') {
    conditions.push(`title ILIKE '%$(searchText:value)%'`)
  }
  if (query.category !== 'all') {
    conditions.push('category = $(category)')
  }

  const sql = `
SELECT
  w.id,
  w.image_url,
  w.title,
  w.min_number,
  w.max_number,
  w.deadline,
  w.closing,
  w.pre_price,
  w.price,
  COUNT(a.workshop_id)::integer AS attendees_number,
  u.id AS author_id,
  u.name AS author_name,
  u.thumbnail_url AS author_thunmbnail_url
FROM workshop AS w
LEFT JOIN attend_workshop AS a
ON a.workshop_id = w.id
INNER JOIN create_workshop AS c
ON c.workshop_id = w.id
INNER JOIN users AS u
ON u.id = c.user_id
${utils.sql.whereClause(conditions)}
GROUP BY
  w.id,
  u.id
ORDER BY ${order}
;`

  return db.any(sql, query)
    .map(utils.organize(['author']))
}
