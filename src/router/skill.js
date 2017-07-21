const express = require('express')

const skillTable = require('../table/skill.js')
const userTable = require('../table/user.js')
const {
  voteSkillTable,
  equipSkillTable
} = require('../table/foreign.js')
const {
  friends
} = require('../table/other.js')

const router = express.Router()

const baseUrl = '/skills'

const userId = 2

// Create {{{1
router.post(`${baseUrl}`, (req, res, next) => {
  res.json({
    id: 1
  })
})

// List {{{1
router.get(`${baseUrl}`, (req, res, next) => {
  res.json(skillTable.map(addExtraProp))
})

// View {{{1
router.get(`${baseUrl}/:id`, (req, res, next) => {
  let {id} = req.params
  id = +id
  const skill = skillTable[id - 1]
  res.json(addExtraProp(skill))
})

// Vote {{{1
router.post(`${baseUrl}/:id/vote`, (req, res, next) => {
  let {id} = req.params
  id = +id
  res.json(levelCount(id))
})

//  Equip {{{1
router.post(`${baseUrl}/:id/equip`, (req, res, next) => {
  // TODO: insert or delete equip
  const equippedSkills = equipSkillTable
    .filter(equip => equip.userId === userId)
    .map(equip => Object.assign(equip,
      select(['id', 'name', 'category'])(skillTable[equip.skillId - 1])
    )).map(reject(['userId', 'skillId']))
  res.json({ equippedSkills })
})

// Update {{{1
router.put(`${baseUrl}/:id`, (req, res, next) => {
  let {id} = req.params
  id = +id
  const skill = skillTable.slice(id - 1, id)[0]
  skill.updatedAt = Date.now()
  res.json(skill)
})

// utils {{{1

function addExtraProp (skill) {
  const id = skill.id
  let ret = Object.assign(skill, levelCount(id))
  ret.friends = friends[id - 1].map(friendThumbnail)
  ret.level = (voteSkillTable
    .find(vote => {
      return vote.skillId === id && vote.userId === userId
    }) || {level: 'none'}).level
  return ret
}

function levelCount (skillId) {
  const votes = voteSkillTable.filter(vote => vote.skillId === skillId)
  const count = (votes, level) => votes
    .filter(vote => vote.level === level)
    .length
  const basicNumber = count(votes, 'basic')
  const advancedNumber = count(votes, 'advanced')
  return {
    basicNumber,
    advancedNumber
  }
}

function friendThumbnail (id) {
  return {
    id,
    thumbnailUrl: userTable[id - 1].thumbnailUrl
  }
}

function select (props) {
  return obj => {
    let ret = {}
    for (let prop of props) {
      ret[prop] = obj[prop]
    }
    return ret
  }
}

function reject (props) {
  return obj => {
    let ret = obj
    for (let prop of props) {
      delete ret[prop]
    }
    return ret
  }
}

// }}}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
