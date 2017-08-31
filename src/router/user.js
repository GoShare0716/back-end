const express = require('express')
const bodyParser = require('body-parser')

const model = require('src/model')
const utils = require('src/utils')

const router = express.Router()
router.use(bodyParser.json())

const baseUrl = '/users'

// me
router.get(baseUrl + '/me', (req, res, next) => {
  const user = utils.getUser(res, {loginRequired: true})

  model.user.viewSelf(user)
    .then(ret => { res.json(ret) })
    .catch(next)
})

// View
router.get(baseUrl + '/:id', (req, res, next) => {
  const userId = +req.params.id
  const user = utils.getUser(res)

  model.user.view(userId, user)
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
