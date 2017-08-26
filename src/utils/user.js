const R = require('ramda')

const adapter = (user) => {
  return R.omit(['accessToken'], user)
}

module.exports = {
  adapter
}
