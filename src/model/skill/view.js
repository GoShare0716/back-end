const db = require('src/db')
const sql = require('src/sql').skill.view
const utils = require('src/utils')

module.exports = (userId, skillId) => db.task(t => {
  // TODO friends
  return t
    .one(sql, {userId, skillId})
    .then(utils.organize(['vote', 'equip']))
})
