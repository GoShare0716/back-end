const express = require('express')

const router = express.Router()

const baseUrl = '/workshops'

// Create {{{1
router.post(baseUrl, (req, res, next) => {
})

// List {{{1
router.get(baseUrl, (req, res, next) => {
  // function addExtraProp (userId) {
  //   return function (workshop) {
  //     const id = workshop.id
  //     const x = attendeesNumber(id)
  //     return Object.assign({}, workshop, {
  //       friends: attendedFriends(id, userId),
  //       attendeesNumber: x,
  //       phase: phase(workshop, x)
  //     })
  //   }
  // }

  // res.json(workshopTable
  //   .filter(workshop => workshop.published === true)
  //   .map(addExtraProp(userId))
  // )
})

// View {{{1
router.get(baseUrl + '/:id', (req, res, next) => {
  // const workshopId = +req.params.id

  // const workshop = workshopTable[workshopId - 1]
  // const x = attendeesNumber(workshopId, userId)

  // res.json(Object.assign({},
  //   workshop,
  //   attendState(workshopId, userId),
  //   {
  //     friends: attendedFriends(workshopId, userId),
  //     attendeesNumber: x,
  //     phase: phase(workshop, x),
  //     author: authorInfo(workshopId)
  //   }
  // ))
})

// Attend {{{1
router.post(baseUrl + '/:id', (req, res, next) => {
  // // develop only, return value based on workshopId
  // const workshopId = +req.params.id
  // switch (workshopId % 3) {
  //   case 1:
  //     res.json({
  //       attended: false,
  //       canceled: false
  //     })
  //     break
  //   case 2:
  //     res.json({
  //       attended: true,
  //       canceled: false
  //     })
  //     break
  //   default:
  //     res.json({
  //       attended: false,
  //       canceled: true
  //     })
  // }
})

// Attendees {{{1
router.get(baseUrl + '/:id/attendees', (req, res, next) => {
  // const workshopId = +req.params.id
  // res.json(attendWorkshopTable
  //   .filter(attend => attend.workshopId === workshopId)
  //   .map(attend => attend.userId)
  //   .map(userId => userTable[userId - 1])
  // )
})

// Update {{{1
router.put(baseUrl + '/:id', (req, res, next) => {
  // const workshopId = +req.params.id
  // const workshop = workshopTable[workshopId - 1]
  // res.json(Object.assign({},
  //   workshop,
  //   {
  //     updatedAt: Date.now()
  //   }
  // ))
})

// Delete {{{1
router.delete(baseUrl + '/:id', (req, res, next) => {
  // res.sendStatus(200)
})

// util {{{1

// function attendedFriends (workshopId, userId) { // {{{2
//   return attendWorkshopTable
//     .filter(attend => attend.workshopId === workshopId)
//     .map(attend => attend.workshopId)
//     .filter(isFriend(userId))
//     .map(friendInfo)
// }

// function attendeesNumber (id) { // {{{2
//   return attendWorkshopTable
//     .filter(attend => attend.workshopId === id)
//     .filter(attend => attend.canceled === false)
//     .map(_ => 1)
//     .reduce((acc, x) => acc + x, 0)
// }

// function phase (workshop, attendeesNumber) { // {{{2
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

// function attendState (workshopId, userId) { // {{{2
//   let myAttend = attendWorkshopTable
//     .filter(attend => attend.workshopId === workshopId)
//     .filter(attend => attend.userId === userId)
//     .pop()
//   return {
//     canceled: (myAttend && myAttend.canceled) || false,
//     attended: (myAttend && myAttend.canceled === false) || false
//   }
// }

// function authorInfo (workshopId) { // {{{2
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

// END {{{1
// }}}

module.exports = router

// vim:set et sw=2 ts=8 fdm=marker:
