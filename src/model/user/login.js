const R = require('ramda')
const FB = require('fb')
const Promise = require('bluebird')

const db = require('src/db')
const sql = require('src/sql')
const utils = require('src/utils')
const error = require('src/error')

FB.options({'appSecret': `${process.env.FB_APP_SECRET_KEY}`})

/*
 * 1. get long lived access token and check whether is it valid
 * 2. check user exists
 *    - if user not exists
 *      + new
 *    - else
 *      + if not valid, throw error
 *      + else, update access token in database into long lived one
 * 3. return
 *    - id
 *    - fb_id
 *    - access_token
 *    - role
 */

module.exports = body => db.task(t => {
  const { fbId, accessToken } = body
  const longLived = utils.facebook.longLivedToken(accessToken)
  const valid = FB.api('/me', { access_token: accessToken })
    .then(R.prop('id'))
    .then(R.equals(fbId))

  return Promise.all([valid, longLived]).spread((valid, longLived) => {
    if (!valid) { throw error.invalidFbUser }

    // replace access token into long lived one
    const data = R.assoc('accessToken', longLived, body)

    return t.oneOrNone(sql.user.exist, body)
      .then(R.cond([
        [R.isNil, () => t.one(sql.user.new, data)],
        // TODO: only update empty field, tempararily only update to long lived
        [R.T, () => t.one(sql.user.update, data)]
      ]))
  })
})
