const moment = require('moment')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')

module.exports = (workshopId, user) => {
  const now = moment().valueOf()
  const userId = user.id

  return db.task(t => {
    return utils.facebook.friends(user)
      .then(friends => {
        return t.one(sql.workshop.get, { workshopId, userId, friends })
          .then(utils.workshop.assocPhase(now))
          .then(utils.organize(['author', 'attendees']))
          .then(utils.workshop.adapter)
      })
  })
}
