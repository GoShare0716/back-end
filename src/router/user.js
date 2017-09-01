const express = require('express')
const bodyParser = require('body-parser')
const R = require('ramda')

const model = require('src/model')
const utils = require('src/utils')
const error = require('src/error')

const router = express.Router()
router.use(bodyParser.json())

const baseUrl = '/users'

// me
router.get(baseUrl + '/me', (req, res, next) => {
  const user = utils.getUser(res, {loginRequired: true})

  model.user.viewSelf(user)
    .then(ret => { res.json(ret) })
    .catch(next)
})

// View
router.get(baseUrl + '/:id', (req, res, next) => {
  const userId = +req.params.id
  const user = utils.getUser(res)

  model.user.view(userId, user)
    .then(ret => { res.json(ret) })
    .catch(next)
})

// Update certain field
router.put(baseUrl + '/:id/:field', (req, res, next) => {
  // TODO userId and user ambigious
  // TODO handle authority problem by one general function, like guest, author, self, adamin
  const allowedField = [
    'email',
    'introduction',
    'fbUrl',
    'personalWebUrl',
    'available'
  ]

  const userId = +req.params.id
  const field = req.params.field
  const user = utils.getUser(res, {loginRequired: true})
  const data = req.body[field]

  if (!R.contains(field, allowedField)) {
    res.sendStatus(404)
  }

  if (user.role !== 'admin' && (+user.id) !== userId) {
    throw error.selfOnly
  }

  model.user.setField(userId, field, data)
    .then(data => { res.json(data) })
    .catch(next)
})

module.exports = router
