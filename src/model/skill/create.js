const db = require('src/db')
const sql = require('src/sql').skill

module.exports = (userId, body) => db.task(t => {
  return t.one(sql.new, body)
    .then(({id: skillId}) => {
      t.none(sql.create, {userId, skillId})
      return {id: skillId}
    })
})
