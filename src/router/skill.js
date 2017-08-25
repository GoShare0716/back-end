const express = require('express')
const bodyParser = require('body-parser')
const R = require('ramda')

const model = require('src/model')
const utils = require('src/utils')

const router = express.Router()
router.use(bodyParser.json())

const baseUrl = '/skills'

// Create
router.post(baseUrl, (req, res, next) => {
  const user = utils.getUser(res, {loginRequired: true})

  model.skill.create(user.id, req.body)
    .then(id => { res.json(id) })
    .catch(next)
})

// List
router.get(baseUrl, (req, res, next) => {
  const user = utils.getUser(res)

  const query = R.merge({
    searchText: '',
    ordering: 'alphabetical',
    category: 'all'
  }, req.query)

  model.skill.list(user.id, query)
    .then(skills => { res.json(skills) })
    .catch(next)
})

// View
router.get(baseUrl + '/:id', (req, res, next) => {
  const skillId = +req.params.id
  const user = utils.getUser(res)

  model.skill.view(user.id, skillId)
    .then(skill => { res.json(skill) })
    .catch(next)
})

// Vote
router.post(baseUrl + '/:id/vote', (req, res, next) => {
  // const skillId = +req.params.id
  // res.json(levelCount(skillId))
})

//  Equip
router.post(baseUrl + '/:id/equip', (req, res, next) => {
  // // TODO: insert or delete equip
  // const equippedSkills = equipSkillTable
  //   .filter(equip => equip.userId === userId)
  //   .map(equip => Object.assign({}, equip,
  //     select(['id', 'name', 'category'])(skillTable[equip.skillId - 1])
  //   )).map(reject(['userId', 'skillId']))
  // res.json({ equippedSkills })
})

// Update
router.put(baseUrl + '/:id', (req, res, next) => {
  // const skillId = +req.params.id
  // const skill = skillTable[skillId - 1]
  // res.json(Object.assign({}, skill, {
  //   updatedAt: Date.now()
  // }))
})

// util

// function addExtraProp (userId) {
//   return function (skill) {
//     const skillId = skill.id
//     return Object.assign({},
//       skill,
//       levelCount(skillId),
//       skillLevel(skillId, userId),
//       { friends: votedFriends(skillId, userId) }
//     )
//   }
// }

// function levelCount (skillId) {
//   const votes = voteSkillTable.filter(vote => vote.skillId === skillId)
//   const count = (votes, level) => votes
//     .filter(vote => vote.level === level)
//     .length
//   const basicNumber = count(votes, 'basic')
//   const advancedNumber = count(votes, 'advanced')
//   return {
//     basicNumber,
//     advancedNumber
//   }
// }

// function votedFriends (skillId, userId) {
//   return voteSkillTable
//     .filter(vote => vote.skillId === skillId)
//     .map(vote => vote.userId)
//     .filter(isFriend(userId))
//     .map(friendInfo)
// }

// function skillLevel (skillId, userId) {
//   const isMySkill = (item) =>
//     item.skillId === skillId && item.userId === userId
//   // const voteLevel = voteSkillTable.filter(isMySkill).map(x => x.level).pop() || 'none'
//   // const equipLevel = equipSkillTable.filter(isMySkill).map(x => x.level).pop() || 'none'
//   const [voteLevel, equipLevel] = [voteSkillTable, equipSkillTable]
//     .map(table => table
//       .filter(isMySkill)
//       .map(x => x.level)
//       .pop() || 'none'
//     )
//   return {
//     voteLevel,
//     equipLevel
//   }
// }

module.exports = router
