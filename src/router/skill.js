const express = require('express')

// data
const skillTable = require('../table/skill.js')
const {
  voteSkillTable,
  equipSkillTable
} = require('../table/foreign.js')

// util function
const {
  isFriend,
  friendInfo,
  select,
  reject
} = require('../util.js')

const router = express.Router()

const baseUrl = '/skills'

const userId = 2 // current user Id

// Create {{{1
router.post(`${baseUrl}`, (req, res, next) => {
  res.json({
    id: 1
  })
})

// List {{{1
router.get(`${baseUrl}`, (req, res, next) => {
  res.json(skillTable.map(addExtraProp(userId)))
})

// View {{{1
router.get(`${baseUrl}/:id`, (req, res, next) => {
  const skillId = +req.params.id
  const skill = skillTable[skillId - 1]
  res.json(addExtraProp(userId)(skill))
})

// Vote {{{1
router.post(`${baseUrl}/:id/vote`, (req, res, next) => {
  const skillId = +req.params.id
  res.json(levelCount(skillId))
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
  const skillId = +req.params.id
  const skill = skillTable.slice(skillId - 1, skillId)[0]
  skill.updatedAt = Date.now()
  res.json(skill)
})

// util {{{1

function addExtraProp (userId) {
  return function (skill) {
    const id = skill.id
    let ret = Object.assign(skill, levelCount(id))
    ret.friends = votedFriends(id, userId)
    ret.level = (voteSkillTable
      .find(vote => {
        return vote.skillId === id && vote.userId === userId
      }) || {level: 'none'}).level
    return ret
  }
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

function votedFriends (skillId, userId) {
  return voteSkillTable
    .filter(vote => vote.skillId === skillId)
    .map(vote => vote.userId)
    .filter(isFriend(userId))
    .map(friendInfo)
}

// }}}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
