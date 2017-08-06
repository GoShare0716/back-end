const express = require('express')
const bodyParser = require('body-parser')

const model = require('src/model')
const error = require('src/error')

const router = express.Router()
router.use(bodyParser.json())

const baseUrl = '/users'

// me
router.get(baseUrl + '/me', (req, res, next) => {
  const userId = res.locals.userId // Maybe(userId)

  if (userId.isNothing()) { throw error.memberOnly }

  model.user.view(userId.getOrElse(0))
    .then(ret => { res.json(ret) })
    .catch(next)
})

// View
router.get(baseUrl + '/:id', (req, res, next) => {
  const userId = +req.params.id

  model.user.view(userId)
    .then(ret => { res.json(ret) })
    .catch(next)
})

// Update
// genUpdateApi('email')
// genUpdateApi('introduction')
// genUpdateApi('fbUrl')
// genUpdateApi('personalWebUrl')
// genUpdateApi('available')

// util

// function genUpdateApi (field) {
//   router.put(`${baseUrl}/:id/${field}`, (req, res, next) => {
//     const data = req.body[field]
//     if (data === undefined) {
//       const err = new Error(`Data not found.(User Update ${field})`)
//       err.status = 400
//       throw err
//     }
//     let obj = {}
//     obj[field] = data
//     res.json(obj)
//   })
// }

module.exports = router

// vim:set et sw=2 ts=8 :
