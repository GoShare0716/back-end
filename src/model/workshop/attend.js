const R = require('ramda')
const moment = require('moment')

const db = require('src/db')
const sql = require('src/sql')
const error = require('src/error')

module.exports = (workshopId, user) => {
  const now = moment().valueOf()
  const userId = user.id
  const notAvailable = R.complement(R.propSatisfies)(
    R.flip(R.contains)(['judge_ac', 'reached']),
    'state'
  )
  const isFull = R.converge(
    R.equals,
    R.map(R.prop, ['attendeesNumber', 'maxNumber'])
  )
  const wannaAttend = workshop => R.equals(
    R.props(['attended', 'canceled'], workshop),
    [false, false]
  )
  const wannaCancel = workshop => R.equals(
    R.props(['attended', 'canceled'], workshop),
    [true, false]
  )

  return db.tx(t => {
    return t.none(sql.workshop.unreached, {now})
      .then(() => {
        return t.one(sql.workshop.get, { workshopId, userId })
      })
      .then(R.cond([
        [notAvailable, () => { throw error.notAvailable }],
        [isFull, () => { throw error.workshopFull }],
        [wannaAttend, () => {
          return t.none(sql.workshop.attend, { workshopId, userId, now })
            .then(() => {
              return t.none(sql.workshop.reached, { workshopId, now })
            })
        }],
        [wannaCancel, () => {
          return t.none(sql.workshop.cancel, { workshopId, userId })
        }]
      ]))
      .then(() => {
        return t.one(sql.workshop.attendInfo, { workshopId, userId })
      })
  })
}
