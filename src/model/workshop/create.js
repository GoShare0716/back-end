const db = require('src/db')
const sql = require('src/sql')

module.exports = (userId, body) => db.tx(t => {
  return t.one(sql.workshop.new, body)
    .then(({ id: workshopId }) => {
      return t.one(sql.workshop.create, {workshopId, userId})
    })
    .then(({workshopId}) => {
      return { id: workshopId }
    })
})
