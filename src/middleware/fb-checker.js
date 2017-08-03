const FB = require('fb')

FB.options({'appSecret': `${process.env.FB_APP_STAGE_SECRET}`})

const err = new Error('Invalid fb user. (fb-checker)')
err.status = 401

module.exports = (req, res, next) => {
  const fbId = req.get('fbId')
  const accessToken = req.get('accessToken')

  if (fbId !== undefined) {
    if (accessToken === undefined) { throw err }

    // call next() after FB response
    FB.api('/me', {access_token: accessToken})
      .then(({id}) => {
        if (id !== fbId) { throw err }
        next()
      })
      .catch(next)
  }
}
