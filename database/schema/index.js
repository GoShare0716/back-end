const path = require('path')
const pgp = require('pg-promise')({
  capSQL: true
})

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new pgp.QueryFile(fullPath, {minify: true})
}

const extensionsSql = 'CREATE EXTENSION IF NOT EXISTS pg_trgm'
const dropSql = sql('./drop.sql')
const typeSql = sql('./type.sql')
const workshopSql = sql('./workshop.sql')
const skillSql = sql('./skill.sql')
const usersSql = sql('./users.sql')
const foreignSql = sql('./foreign.sql')

module.exports = pgp.helpers.concat([
  extensionsSql,
  dropSql,
  typeSql,
  workshopSql,
  skillSql,
  usersSql,
  foreignSql
])
