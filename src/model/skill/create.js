const db = require('src/db')
const sql = require('src/sql').skill

module.exports = (userId, body) => db.tx(t => {
  return t.one(sql.new, body)
    .then(({id: skillId}) => {
      return t.one(sql.create, {userId, skillId})
    })
    .then(({skillId}) => {
      return {id: skillId}
    })
})
