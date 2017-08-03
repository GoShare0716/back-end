const db = require('src/db')
const sql = require('src/sql')

module.exports = (fbId, body) => db.task(t => {
  const workshopId = t.one(sql.workshop.new, body)
  const userId = t.one(sql.user.getId, {fbId})

  return Promise.all([workshopId, userId])
    .then(([{id: workshopId}, {id: userId}]) => {
      return t.none(sql.workshop.create, {workshopId, userId})
        .then(() => ({id: workshopId}))
    })
})
