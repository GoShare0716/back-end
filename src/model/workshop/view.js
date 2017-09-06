const R = require('ramda')
const moment = require('moment')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')
const error = require('src/error')

module.exports = (workshopId, user) => {
  const now = moment().valueOf()
  const userId = user.id

  // private workshop only admin and author can view
  const authCheck = R.curry((user, workshop) => {
    if (
      !utils.user.isAdmin(user) &&
      utils.workshop.isPrivate(workshop) &&
      !utils.workshop.isAuthor(workshop)
    ) { throw error.authorOnly }
    return workshop
  })

  return db.task(t => {
    return utils.facebook.friends(user)
      .then(friends => {
        return t.one(sql.workshop.get, { workshopId, userId, friends })
          .then(authCheck(user))
          .then(utils.workshop.assocPhase(now))
          .then(utils.organize(['author', 'attendees']))
          .then(utils.workshop.adapter)
      })
  })
}
