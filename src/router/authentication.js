const express = require('express')
const bodyParser = require('body-parser')
const R = require('ramda')

const error = require('src/error')
const model = require('src/model')

const router = express.Router()
router.use(bodyParser.json())

// Login
router.post(`/login/facebook`, (req, res, next) => {
  if (R.any(R.isNil, R.props(['fbId', 'accessToken'], req.body))) {
    throw error.fbInfoRequired
  }

  model.user.login(req.body)
    .then(ret => { res.json(ret) })
    .catch(next)
})

// Logout
router.post('/logout', (req, res, next) => {

})

module.exports = router
