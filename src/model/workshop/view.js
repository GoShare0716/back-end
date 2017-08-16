const moment = require('moment')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')

module.exports = (user, workshopId) => {
  // TODO friends
  const now = moment().valueOf()

  return db.task(t => {
    return t.one(sql.workshop.get,
      {
        workshopId,
        userId: user.id
      })
      .then(utils.organize(['author']))
      .then(utils.workshop.assocPhase(now))
  })
}
