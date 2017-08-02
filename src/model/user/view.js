const db = require('src/db')
const sql = require('src/sql').user
const R = require('ramda')

module.exports = (userId) => {
  const props = [
    'profile',
    'voteSkills',
    'equipSkills',
    'createWorkshops',
    'attendWorkshops'
  ]

  return db.task(t => {
    const ary = []

    ary.push(t.one(sql.profile, {userId}))
    for (let prop of props.slice(1)) {
      ary.push(t.any(sql[prop], {userId}))
    }

    return Promise.all(ary).then(R.zipObj(props))
  })
}
