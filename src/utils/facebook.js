const R = require('ramda')
const FB = require('fb')

const log = x => {
  console.log(JSON.stringify(x, null, 2))
  return x
}

function friends (user) {
  // TODO handle pagination
  return FB.api('/me/friends', { access_token: user.accessToken })
    .then(res => res.data.map(R.prop('id')))
}

module.exports = {
  friends
}
