const FB = require('fb')

FB.options({'appSecret': `${process.env.FB_APP_STAGE_SECRET}`})

const err = new Error('Invalid fb user. (fb-checker)')
err.status = 401

module.exports = (req, res, next) => {
  const fbId = req.get('fbId')
  const accessToken = req.get('accessToken')

  if (fbId !== undefined) {
    if (accessToken === undefined) { throw err }

    FB.api('/me', {accessToken})
      .then(({id}) => { if (id !== fbId) { throw err } })
      .catch(next)
  }

  next()
}
