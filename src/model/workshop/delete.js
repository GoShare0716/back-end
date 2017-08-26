
const db = require('src/db')
const error = require('src/error')
const sql = require('src/sql')

module.exports = (workshopId, user) => {
  const userId = user.id

  return db.task(t => {
    return t.one(sql.workshop.get, { workshopId, userId })
      .then(workshop => {
        if (user.role !== 'admin' && !workshop.isAuthor) {
          throw error.notAuthor
        }
        return t.none(sql.workshop.delete, { workshopId })
      })
  })
}
