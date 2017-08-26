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
})

// util

// function attendedFriends (workshopId, userId) { //
//   return attendWorkshopTable
//     .filter(attend => attend.workshopId === workshopId)
//     .map(attend => attend.workshopId)
//     .filter(isFriend(userId))
//     .map(friendInfo)
// }

// function attendeesNumber (id) { //
//   return attendWorkshopTable
//     .filter(attend => attend.workshopId === id)
//     .filter(attend => attend.canceled === false)
//     .map(_ => 1)
//     .reduce((acc, x) => acc + x, 0)
// }

// function phase (workshop, attendeesNumber) { //
//   const {
//     state,
//     deadline,
//     endDatetime,
//     maxNumber
//   } = workshop
//   if (attendeesNumber === undefined) {
//     console.error('phase function need "attendeesNumber" property.')
//   }
//   const now = Date.now()
//   switch (state) {
//     case 'judge_ac':
//       return 'investigating'
//     case 'reached':
//       if (deadline < now) {
//         return 'closed'
//       } else if (endDatetime < now) {
//         return 'over'
//       } else if (attendeesNumber === maxNumber) {
//         return 'full'
//       } else {
//         return 'reached'
//       }
//     default:
//       return state
//   }
// }

// function attendState (workshopId, userId) { //
//   let myAttend = attendWorkshopTable
//     .filter(attend => attend.workshopId === workshopId)
//     .filter(attend => attend.userId === userId)
//     .pop()
//   return {
//     canceled: (myAttend && myAttend.canceled) || false,
//     attended: (myAttend && myAttend.canceled === false) || false
//   }
// }

// function authorInfo (workshopId) { //
//   const authorId = createWorkshopTable
//     .filter(create => create.workshopId === workshopId)
//     .map(create => create.userId)
//     .pop()
//   if (authorId === undefined) {
//     const err = new Error('This workshop doesn\'t exist in createWorkshopTable.')
//     throw err
//   }
//   const author = userTable.filter(user => user.id === authorId).pop()
//   if (author === undefined) {
//     const err = new Error('The author of this workshop is a GHOST!!!(not in userTable)')
//     throw err
//   }
//   return select(['id', 'name', 'introduction'])(author)
// }

// END
//

module.exports = router
