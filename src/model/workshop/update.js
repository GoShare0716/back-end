const R = require('ramda')

const db = require('src/db')
const error = require('src/error')
const sql = require('src/sql')
const utils = require('src/utils')

module.exports = (workshopId, user, body) => db.task(t => {
  // general meaning, NOT workshop.state === 'judging'
  const judging = workshop => R.contains(workshop.state, ['judging', 'judge_na'])
  const updateData = R.merge(body, { workshopId })
  const userId = user.id
  const friends = ['-1']

  if (user.role === 'admin') {
    return t.one(sql.workshop.updateAll, updateData)
      .then(utils.workshop.adapter)
  } else {
    return t.one(sql.workshop.get, { workshopId, userId, friends })
      .then(workshop => {
        if (!workshop.isAuthor) { throw error.authorOnly }
        return R.cond([
          [judging, () => t.one(sql.workshop.updateWhenJudging, updateData)],
          [R.T, () => t.one(sql.workshop.updateByAuthor, updateData)]
        ])(workshop)
      })
      .then(utils.workshop.adapter)
  }
})
