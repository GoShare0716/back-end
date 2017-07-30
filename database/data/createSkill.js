const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [ 'skill_id', 'user_id' ], {
    table: 'create_skill'
  }
)

const _datas = [
    [1, 2],
    [2, 2],
    [3, 2]
]

const datas = _datas.map((x) => ({
  skill_id: x[0],
  user_id: x[1]
}))

module.exports = {
  columnSet,
  datas
}
