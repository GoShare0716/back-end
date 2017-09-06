const R = require('ramda')
const FB = require('fb')
const Promise = require('bluebird')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')
const error = require('src/error')

FB.options({'appSecret': `${process.env.FB_APP_SECRET_KEY}`})

/*
 * 1. check user exists (fb_id)
 * 2. transform access token to long lived one
 * 3. user not exists
 *    - new
 * 4. user exists
 *    - judge the (fbId, accessToken) pair by fb api
 *    - correct, update the the accessToken to long lived
 *    - return the (fbId, accessToken), which accessToken is updated
 */

module.exports = body => db.task(t => {
  const { fbId, accessToken } = body
  const longLived = utils.facebook.longLivedToken(accessToken)
  const valid = FB.api('/me', { access_token: accessToken })
    .then(R.prop('id'))
    .then(R.equals(fbId))

  return Promise.all([valid, longLived]).spread((valid, longLived) => {
    if (!valid) { throw error.invalidFbUser }

    const data = R.assoc('accessToken', longLived, body)

    // TODO: only update empty field, tempararily didn't change anything
    return t.oneOrNone(sql.user.exist, body)
      .then(R.cond([
        [R.isNil, () => t.one(sql.user.new, data)],
        // [R.T, () => t.one(sql.user.update, data)]
        [R.T, R.identity]
      ]))
  })
})
