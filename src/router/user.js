const express = require('express')
const bodyParser = require('body-parser')

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

router.use(bodyParser.json())

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

// Update {{{1
genUpdateApi('email')
genUpdateApi('introduction')
genUpdateApi('fbUrl')
genUpdateApi('personalWebUrl')
genUpdateApi('available')

// API END {{{1
// }}}

// util {{{1

function genUpdateApi (field) {
  router.put(`${baseUrl}/:id/${field}`, (req, res, next) => {
    const data = req.body[field]
    if (data === undefined) {
      const err = new Error(`Data not found.(User Update ${field})`)
      err.status = 400
      throw err
    }
    let obj = {}
    obj[field] = data
    res.json(obj)
  })
}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
