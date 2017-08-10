const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [ 'user_id', 'skill_id', 'level' ], {
    table: 'vote_skill'
  }
)

const _datas = [
  [1, 1, 'advanced'],
  [1, 3, 'basic'],
  [2, 1, 'advanced'],
  [2, 3, 'basic'],
  [3, 1, 'basic'],
  [3, 2, 'basic']
]

const datas = _datas.map((x) => ({
  user_id: x[0],
  skill_id: x[1],
  level: x[2]
}))

module.exports = {
  columnSet,
  datas
}
