const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')

module.exports = body => db.task(t => {
  return t.oneOrNone(sql.user.userLoginInfo, body).then(loginInfo => {
    return utils.auth.fbLongLivedToken(body).then(body => {
      return R.cond([
        [R.isNil, () => t.one(sql.user.new, body)],
        [R.T, () => t.one(sql.user.update, body)]
      ])(loginInfo)
    })
  })
})
