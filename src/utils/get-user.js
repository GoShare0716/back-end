const error = require('src/error')

function getUser (res, options = {
  loginRequired: false
}) {
  const {login, user} = res.locals

  if (options.loginRequired && login === false) {
    throw error.memberOnly
  }

  const guest = {
    id: -1,
    role: 'member'
  }

  return (login) ? user : guest
}

module.exports = getUser
