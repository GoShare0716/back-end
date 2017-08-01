const db = require('src/db')
const sql = require('src/sql').workshop.create

module.exports = function (body) {
  return db.one(sql, body)
}
