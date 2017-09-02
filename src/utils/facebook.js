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

module.exports = {
  friends
}
