const R = require('ramda')
const M = require('ramda-fantasy').Maybe

const db = require('src/db')
const sql = require('src/sql').user.getId

module.exports = (req, res, next) => {
  const fbId = req.get('fbId')
  const accessToken = req.get('accessToken')

  if (fbId !== undefined && accessToken !== undefined) {
    db.oneOrNone(sql, {fbId, accessToken})
      .then(x => {
        res.locals.userId = M.toMaybe(x).map(R.prop('id'))
      })
      .finally(() => { next() })
  } else {
    res.locals.userId = M.Nothing()
    next()
  }
}
