const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [ 'workshop_id', 'user_id', 'canceled' ], {
    table: 'attend_workshop'
  }
)

const _datas = [
  [1, 1, false],
  [1, 2, false],
  [2, 3, false],
  [3, 1, true],
  [3, 2, true]
]

const datas = _datas.map((x) => ({
  workshop_id: x[0],
  user_id: x[1],
  canceled: x[2]
}))

module.exports = {
  columnSet,
  datas
}
