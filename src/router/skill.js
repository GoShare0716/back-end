const express = require('express')
const skillDatas = require('../data/skill.js')
const userDatas = require('../data/user.js')

const router = express.Router()

const baseUrl = '/skills'

// Create {{{1
router.post(`${baseUrl}`, (req, res, next) => {
  res.json({
    id: 1
  })
})

// List {{{1
router.get(`${baseUrl}`, (req, res, next) => {
  var skills = skillDatas.slice()
  var basicNumbers = [3, 7, 6]
  var advancedNumbers = [5, 1, 2]
  var friendLists = [
    [1],
    [2, 3],
    []
  ]
  for (let i = 0; i < 3; i++) {
    friendLists[i] = friendLists[i].map(friendThumbnail)
  }
  for (let i = 0; i < 3; i++) {
    skills[i].basicNumber = basicNumbers[i]
    skills[i].advancedNumber = advancedNumbers[i]
    skills[i].friends = friendLists[i]
  }
  res.json(skills)
})

// View {{{1
router.get(`${baseUrl}/:id`, (req, res, next) => {
  var skill = skillDatas[0]
  skill.basicNumber = 3
  skill.advancedNumber = 5
  skill.friends = [1].map(friendThumbnail)
  res.json(skill)
})

// Update {{{1
router.put(`${baseUrl}/:id`, (req, res, next) => {
  var skill = skillDatas[0]
  skill.updatedAt = Date.now()
  res.json(skill)
})

// util functions {{{1
function friendThumbnail (id) {
  return {
    id,
    thumbnailUrl: userDatas[id - 1].thumbnailUrl
  }
}
// }}}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
