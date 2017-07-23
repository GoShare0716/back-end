const express = require('express')

const workshopTable = require('../table/workshop.js')
const {
  attendWorkshopTable
} = require('../table/foreign.js')

const {
  isFriend,
  friendInfo
} = require('../util.js')

const router = express.Router()

const userId = 2 // current user Id

const baseUrl = '/workshops'

// Create {{{1
router.post(`${baseUrl}`, (req, res, next) => {
  res.json({
    id: 1
  })
})

// List {{{1
router.get(`${baseUrl}`, (req, res, next) => {
  function addExtraProp (userId) {
    return function (workshop) {
      const id = workshop.id
      const x = attendeesNumber(id)
      return Object.assign(workshop, {
        friends: attendedFriends(id, userId),
        attendeesNumber: x,
        phase: phase(workshop, x)
      })
    }
  }

  res.json(workshopTable
    .filter(workshop => workshop.published === true)
    .map(addExtraProp(userId))
  )
})

// View {{{1
router.get(`${baseUrl}/:id`, (req, res, next) => {

})

// Attendees {{{1
router.get(`${baseUrl}/:id/attendees`, (req, res, next) => {

})

// Update {{{1
router.put(`${baseUrl}/:id`, (req, res, next) => {

})

// Delete {{{1
router.delete(`${baseUrl}/:id`, (req, res, next) => {

})

// util {{{1

function attendedFriends (workshopId, userId) { // {{{2
  return attendWorkshopTable
    .filter(attend => attend.workshopId === workshopId)
    .map(attend => attend.workshopId)
    .filter(isFriend(userId))
    .map(friendInfo)
}

function attendeesNumber (id) { // {{{2
  return attendWorkshopTable
    .filter(attend => attend.workshopId === id)
    .filter(attend => attend.canceled === false)
    .map(_ => 1)
    .reduce((acc, x) => acc + x, 0)
}

function phase (workshop, attendeesNumber) { // {{{2
  const {
    state,
    deadline,
    endDatetime,
    maxNumber
  } = workshop
  if (attendeesNumber === undefined) {
    console.error('phase function need "attendeesNumber" property.')
  }
  const now = Date.now()
  switch (state) {
    case 'judge_ac':
      return 'investigating'
    case 'reached':
      if (deadline < now) {
        return 'closed'
      } else if (endDatetime < now) {
        return 'over'
      } else if (attendeesNumber === maxNumber) {
        return 'full'
      } else {
        return 'reached'
      }
    default:
      return state
  }
}

function attendState (workshopId, userId) { // {{{2
  let myAttend = attendWorkshopTable
    .filter(attend => attend.workshopId === workshopId)
    .filter(attend => attend.userId === userId)
    .pop()
  return {
    canceled: (myAttend && myAttend.canceled) || false,
    attended: (myAttend && myAttend.canceled === false) || false
  }
}

// END {{{1
// }}}

module.exports = router

// vim:set et sw=2 ts=8 fdm=marker:
