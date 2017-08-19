const R = require('ramda')

const db = require('src/db')
const sql = require('src/sql').user.userLoginInfo

module.exports = (req, res, next) => {
  const fbId = req.get('fbId')
  const accessToken = req.get('accessToken')

  if (R.none(R.isNil, [fbId, accessToken])) {
    db.oneOrNone(sql, {fbId, accessToken})
      .then(x => {
        res.locals.login = (x !== null)
        res.locals.user = x
      })
      .finally(next)
  } else {
    res.locals.login = false
    next()
  }
}
