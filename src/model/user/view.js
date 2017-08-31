const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql').user
const utils = require('src/utils')

module.exports = (userId, user) => {
  const now = Date.now()

  return db.task(t => {
    return utils.facebook.friends(user).then(friends => {
      // pairs :: (PropName, Sql)[]
      const pairs = [
        ['profile', () => t.one(sql.profile, { userId })],
        ['createWorkshops', () => {
          return t.any(sql.createWorkshopsPublic, { userId, friends })
            .map(utils.workshop.assocPhase(now))
            .map(utils.organize(['author', 'attendees']))
            .map(utils.workshop.adapter)
        }],
        ['attendWorkshops', () => {
          return t.any(sql.attendWorkshopsPublic, { userId, friends })
            .map(utils.workshop.assocPhase(now))
            .map(utils.organize(['author', 'attendees']))
            .map(utils.workshop.adapter)
        }]
      ]
      const props = pairs.map(R.nth(0))
      const sqls = pairs.map(R.nth(1))

      const querys = sqls.map(R.call)

      return Promise.all(querys).then(R.zipObj(props))
    })
  })
}
