const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [ 'workshop_id', 'user_id' ], {
    table: 'create_workshop'
  }
)

const _datas = [
  [1, 2],
  [2, 3],
  [3, 2],
  [4, 1],
  [5, 1],
  [6, 1]
]

const datas = _datas.map((x) => ({
  workshop_id: x[0],
  user_id: x[1]
}))

module.exports = {
  columnSet,
  datas
}
