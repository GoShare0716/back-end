const FB = require('fb')
const R = require('ramda')

// NTHUStage
const APP_ID = 1812105742383573

function fbLongLivedToken (body) {
  const longLived = token => {
    return FB.api('/oauth/access_token',
      {
        grant_type: 'fb_exchange_token',
        client_id: APP_ID,
        client_secret: process.env.FB_APP_STAGE_SECRET,
        fb_exchange_token: token
      })
      .then(R.prop('access_token'))
  }

  return longLived(body.accessToken)
    .then(long => {
      return R.merge(body, {
        accessToken: long
      })
    })
}

module.exports = {
  fbLongLivedToken
}
