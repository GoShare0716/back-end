// createSkillTable {{{1
var createSkillTable = []
fillData(
  createSkillTable,
  ['skillId', 'userId'],
  [
    [1, 2],
    [2, 2],
    [3, 2]
  ]
)

// voteSkillTable {{{1
var voteSkillTable = []
fillData(
  voteSkillTable,
  ['userId', 'skillId', 'level'],
  [
    [1, 1, 'advanced'],
    [1, 3, 'basic'],
    [2, 1, 'advanced'],
    [2, 3, 'basic'],
    [3, 1, 'basic'],
    [3, 2, 'basic']
  ]
)

// equipSkillTable {{{1
var equipSkillTable = []
fillData(
  equipSkillTable,
  ['userId', 'skillId', 'level'],
  [
    [1, 1, 'basic'],
    [2, 1, 'advanced'],
    [2, 3, 'basic'],
    [3, 2, 'basic']
  ]
)

// createWorkshopTable {{{1
var createWorkshopTable = []
fillData(
  createWorkshopTable,
  ['workshopId', 'userId'],
  [
    [1, 2],
    [2, 3],
    [3, 2]
  ]
)

// attendWorkshopTable {{{1
var attendWorkshopTable = []
fillData(
  attendWorkshopTable,
  ['workshopId', 'userId', 'canceled'],
  [
    [1, 2, false],
    [2, 3, false],
    [3, 1, true],
    [3, 2, false]
  ]
)

// utils {{{1
function fillData (table, colNames, rows) {
  for (let row of rows) {
    const N = colNames.length
    if (N !== row.length) {
      // let err = new Error('Incompatible column and data length')
      console.log('Incompatible column and data length')
      console.log(`colNames: ${colNames}`)
      console.log(`row: ${row}`)
      // throw err
    }

    let obj = {}
    for (let i = 0; i < N; i++) {
      obj[colNames[i]] = row[i]
    }
    table.push(obj)
  }
}

// Exports {{{1
module.exports = {
  createSkillTable,
  voteSkillTable,
  equipSkillTable,
  createWorkshopTable,
  attendWorkshopTable
}

// vim:set et sw=2 ts=8 fdm=marker:
