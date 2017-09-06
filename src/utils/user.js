const R = require('ramda')

const adapter = (user) => {
  return R.omit(['accessToken'], user)
}

const isAdmin = R.propSatisfies(R.equals('admin'), 'role')
const isGuest = R.propSatisfies(R.equals(-1), 'id')

module.exports = {
  isAdmin,
  isGuest,
  adapter
}
