const db = require('src/db')
const sql = require('src/sql')

module.exports = (userId, body) => db.task(t => {
  return t.one(sql.workshop.new, body)
    .then(({ id: workshopId }) => {
      t.none(sql.workshop.create, {workshopId, userId})
      return { id: workshopId }
    })
})
