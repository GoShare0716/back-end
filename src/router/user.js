const express = require('express')

const router = express.Router()

const baseUrl = '/users'

// View {{{1
router.get(baseUrl + '/:id', (req, res, next) => {

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
