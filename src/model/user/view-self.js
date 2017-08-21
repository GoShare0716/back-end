const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql').user

module.exports = (userId) => {
  return db.task(t => {
    // pairs :: (PropName, Sql)[]
    const pairs = [
      ['profile', () => t.one(sql.profile, {userId})],
      ['createWorkshops', () => t.any(sql.createWorkshopsAll, {userId})],
      ['attendWorkshops', () => t.any(sql.attendWorkshopsPublic, {userId})]
    ]
    const props = pairs.map(R.nth(0))
    const sqls = pairs.map(R.nth(1))

    const querys = sqls.map(R.call)

    return Promise.all(querys).then(R.zipObj(props))
  })
}
