const sql = require('src/sql')
const db = require('src/db')

db.none(sql.functionDeclaration)
  .catch(e => {
    console.log('function declaration sql error: ', e)
  })

module.exports = {
  skill: require('./skill'),
  user: require('./user'),
  workshop: require('./workshop')
}
