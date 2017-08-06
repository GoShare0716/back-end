function errorFactory (msg, obj) {
  const err = new Error(msg)
  Object.assign(err, obj)
  return err
}

const invalidUser = errorFactory(
  'Invalid User.', {
    status: 400,
    description: '(fbId, accessToken) doesn\'t exist in database'
  }
)

const memberOnly = errorFactory(
  'Need to login', {
    status: 401
  }
)

module.exports = {
  invalidUser,
  memberOnly
}
