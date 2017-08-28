const R = require('ramda')
const FB = require('fb')

const log = x => {
  console.log(JSON.stringify(x, null, 2))
  return x
}

function friends (user) {
  return FB.api('/me/friends', { access_token: user.accessToken })
    .then(log)
    .then(res => res.data.map(R.prop('id')))
    .then(log)
}

module.exports = {
  friends
}
