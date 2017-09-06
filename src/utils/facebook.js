const R = require('ramda')
const FB = require('fb')
const Promise = require('bluebird')

function friends (user) {
  // TODO handle pagination
  if (user.id === -1) {
    return Promise.resolve(['-1'])
  }
  return FB.api('/me/friends', { access_token: user.accessToken })
    .then(R.prop('data'))
    .then(R.ifElse(
      R.isEmpty,
      R.always(Promise.resolve(['-1'])),
      R.map(R.prop('id'))
    ))
}

function longLivedToken (accessToken) {
  return FB.api('/oauth/access_token',
    {
      grant_type: 'fb_exchange_token',
      client_id: process.env.FB_APP_ID,
      client_secret: process.env.FB_APP_SECRET_KEY,
      fb_exchange_token: accessToken
    })
    .then(R.prop('access_token'))
}

module.exports = {
  friends,
  longLivedToken
}
