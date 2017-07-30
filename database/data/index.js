const pgp = require('pg-promise')({
  capSQL: true
})

const usersTable = require('./users.js')
const workshopTable = require('./workshop.js')
const skillTable = require('./skill.js')
const createWorkshopTable = require('./createWorkshop.js')
const attendWorkshopTable = require('./attendWorkshop.js')
const createSkillTable = require('./createSkill.js')
const voteSkillTable = require('./voteSkill.js')
const equipSkillTable = require('./equipSkill.js')

function tableSql (table) {
  const rows = table.datas
  const tableName = table.columnSet.table
  let queries = [`DELETE FROM ${tableName}`]
  return queries.concat(rows.map(row =>
    pgp.helpers.insert(row, table.columnSet)
  ))
}

module.exports = pgp.helpers.concat(
  [
    usersTable,
    workshopTable,
    skillTable,
    createWorkshopTable,
    attendWorkshopTable,
    createSkillTable,
    voteSkillTable,
    equipSkillTable
  ]
  .map(tableSql)
  .reduce((a, b) => a.concat(b))
)
