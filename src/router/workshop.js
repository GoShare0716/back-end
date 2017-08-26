const express = require('express')
const bodyParser = require('body-parser')
const R = require('ramda')

const model = require('src/model')
const utils = require('src/utils')

const router = express.Router()
router.use(bodyParser.json())

const baseUrl = '/workshops'

// TODO order all model's params: workshopId, user, query, body

// Create
router.post(baseUrl, (req, res, next) => {
  const user = utils.getUser(res, {loginRequired: true})

  model.workshop.create(user.id, req.body)
    .then(id => { res.json(id) })
    .catch(next)
})

// List
router.get(baseUrl, (req, res, next) => {
  const user = utils.getUser(res)

  const query = R.merge({
    searchText: '',
    limit: 8,
    offset: 0,
    category: 'all',
    state: 'all',
    ordering: 'hot'
  }, req.query)

  model.workshop.list(user, query)
    .then(workshops => { res.json(workshops) })
    .catch(next)
})

// View
router.get(baseUrl + '/:id', (req, res, next) => {
  const user = utils.getUser(res)
  const workshopId = +req.params.id

  model.workshop.view(user, workshopId)
    .then(x => { res.json(x) })
    .catch(next)
})

// Attend
router.post(baseUrl + '/:id', (req, res, next) => {
  const workshopId = +req.params.id
  const user = utils.getUser(res, {loginRequired: true})

  model.workshop.attend(workshopId, user)
    .then(x => { res.json(x) })
    .catch(next)
})

// Attendees
router.get(baseUrl + '/:id/attendees', (req, res, next) => {
  const workshopId = +req.params.id
  const user = utils.getUser(res, {loginRequired: true})

  model.workshop.attendees(workshopId, user)
    .map(utils.user.adapter)
    .then(attendees => { res.json(attendees) })
    .catch(next)
})

// Update
router.put(baseUrl + '/:id', (req, res, next) => {
  const workshopId = +req.params.id
  const user = utils.getUser(res, {loginRequired: true})

  model.workshop.update(workshopId, user, req.body)
    .then(x => { res.json(x) })
    .catch(next)
})

// Delete
router.delete(baseUrl + '/:id', (req, res, next) => {
  // res.sendStatus(200)
  const workshopId = +req.params.id
  const user = utils.getUser(res, {loginRequired: true})

  model.workshop.delete(workshopId, user)
    .then(() => { res.sendStatus(200) })
    .catch(next)
})

module.exports = router
