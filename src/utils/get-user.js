const error = require('src/error')

function getUser (res, options = {
  loginRequired: false
}) {
  const {login, user} = res.locals

  if (options.loginRequired && login === false) {
    throw error.memberOnly
  }

  return (login) ? user : { id: -1 }
}

module.exports = getUser
