const R = require('ramda')
const FB = require('fb')
const Promise = require('bluebird')

const log = x => {
  console.log(JSON.stringify(x, null, 2))
  return x
}

function friends (user) {
  // TODO handle pagination
  if (user.id === -1) {
    return Promise.resolve(['-1'])
  }
  return FB.api('/me/friends', { access_token: user.accessToken })
    .then(res => res.data.map(R.prop('id')))
    .then(log)
}

module.exports = {
  friends
}
