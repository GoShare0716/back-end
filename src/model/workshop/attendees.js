const db = require('src/db')
const error = require('src/error')
const sql = require('src/sql')

module.exports = (workshopId, user) => db.task(t => {
  return t.one(sql.workshop.get, { workshopId, userId: user.id })
    .then(workshop => {
      if (user.role !== 'admin' && !workshop.isAuthor) {
        throw error.authorOnly
      }
      return t.any(sql.workshop.attendees, { workshopId })
    })
})
