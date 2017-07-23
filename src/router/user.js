const express = require('express')

const userTable = require('../table/user.js')
const skillTable = require('../table/skill.js')
const workshopTable = require('../table/workshop.js')
const {
  voteSkillTable,
  equipSkillTable,
  createWorkshopTable,
  attendWorkshopTable
} = require('../table/foreign.js')

const router = express.Router()

const baseUrl = '/users'

// View {{{1
router.get(baseUrl + '/:id', (req, res, next) => {
  const userId = +req.params.id
  const belongToMe = item => item.userId === userId

  const voteSkills = voteSkillTable
    .filter(belongToMe)
    .map(vote => skillTable[vote.skillId - 1])
    .filter(skill => skill.visible)

  const equipSkills = equipSkillTable
    .filter(belongToMe)
    .map(equip => skillTable[equip.skillId - 1])

  const createWorkshops = createWorkshopTable
    .filter(belongToMe)
    .map(create => workshopTable[create.workshopId - 1])

  const attendWorkshops = attendWorkshopTable
    .filter(belongToMe)
    .map(attend => workshopTable[attend.workshopId - 1])

  res.json(Object.assign({},
    userTable[userId - 1],
    {
      voteSkills,
      equipSkills,
      createWorkshops,
      attendWorkshops
    }
  ))
})

// Update Email {{{1
router.put(baseUrl + '/:id/email', (req, res, next) => {

})

// Update Introduction {{{1
router.put(baseUrl + '/:id/introduction', (req, res, next) => {

})

// Update available{{{1
router.put(baseUrl + '/:id/available', (req, res, next) => {

})
// }}}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
