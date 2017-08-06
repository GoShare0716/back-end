const db = require('src/db')
const sql = require('src/sql').skill.view

module.exports = (userId, skillId) => db.task(t => {
  return t.one(sql, {userId, skillId})
})
