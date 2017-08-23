const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')

const overStateFilter = R.curry((queryState, workshop) => {
  if (queryState === 'reached') {
    return R.contains(workshop.phase, ['closing', 'full', 'reached'])
  } else if (queryState === 'over') {
    return R.equals('over')(workshop.phase)
  } else {
    return true
  }
})

module.exports = (user, query) => {
  // TODO pagination, friends, query-state

  const now = Date.now()
  const isAdminSearch = (user.role === 'admin') && (query.state === 'admin')

  const order = R.cond([
    [R.equals('hot'), R.always('attendees_number DESC')],
    [R.equals('date'), R.always('start_datetime DESC')],
    [R.T, R.always('created_at DESC')] // new
  ])(query.ordering)
  const stateWhitelist = R.cond([
    [R.equals('investigating'), R.always(['judge_ac'])],
    [R.equals('reached'), R.always(['reached'])],
    [R.equals('over'), R.always(['reached'])],
    [R.T, R.always(['judge_ac', 'reached'])]  // all
  ])(query.state)

  const conditions = []
  if (query.searchText !== '') {
    conditions.push(`title ILIKE '%$(searchText:value)%'`)
  }
  if (query.category !== 'all') {
    conditions.push('category = $(category)')
  }
  if (!isAdminSearch) {
    conditions.push('published = true')
    conditions.push(`state IN ($(stateWhitelist:csv))`)
  }

  const listSql = `
SELECT
  w.id,
  w.state,
  w.image_url,
  w.title,
  w.min_number,
  w.max_number,
  w.deadline,
  w.closing,
  w.start_datetime,
  w.pre_price,
  w.price,
  w.published, --- filter usage, not for api
  COUNT(a.user_id)::integer AS attendees_number,
  u.id AS author_id,
  u.name AS author_name,
  u.thumbnail_url AS author_thunmbnail_url
FROM workshop AS w
LEFT JOIN attend_workshop AS a
ON a.workshop_id = w.id AND a.canceled = false
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

  return db.task(t => {
    return t.none(sql.workshop.unreached, {now})
      .then(() => {
        return t.any(listSql, R.merge(query, {stateWhitelist}))
      })
      .map(utils.workshop.assocPhase(now))
      .filter(overStateFilter(query.state))
      .map(R.assoc('friends', [])) // TODO temp
      .map(utils.organize(['author', 'attendees']))
      .map(utils.workshop.adapter)
  })
}
