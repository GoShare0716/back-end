const FB = require('fb')
const R = require('ramda')

const fbLongLivedToken = accessToken => {
  return FB.api('/oauth/access_token',
    {
      grant_type: 'fb_exchange_token',
      client_id: process.env.FB_APP_ID,
      client_secret: process.env.FB_APP_SECRET_KEY,
      fb_exchange_token: accessToken
    })
    .then(R.prop('access_token'))
}

module.exports = {
  fbLongLivedToken
}
