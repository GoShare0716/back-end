const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql')

module.exports = (user, body) => db.tx(t => {
  const userId = user.id

  return t.one(sql.workshop.new, body)
    .then(R.prop('id'))
    .then(workshopId => t.one(sql.workshop.create, { workshopId, userId }))
    .then(R.objOf('id'))
})
