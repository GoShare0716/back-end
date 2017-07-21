const express = require('express')

const workshopTable = require('../table/workshop.js')

const router = express.Router()

const baseUrl = '/workshops'

// Create {{{1
router.post(`${baseUrl}`, (req, res, next) => {
  res.json({
    id: 1
  })
})

// List {{{1
router.get(`${baseUrl}`, (req, res, next) => {

})

// View {{{1
router.get(`${baseUrl}/:id`, (req, res, next) => {

})

// Attendees {{{1
router.get(`${baseUrl}/:id/attendees`, (req, res, next) => {

})

// Update {{{1
router.put(`${baseUrl}/:id`, (req, res, next) => {

})

// Delete {{{1
router.delete(`${baseUrl}/:id`, (req, res, next) => {

})
// }}}

module.exports = router

// vim-modeline {{{1
// vim:set et sw=2 ts=8 fdm=marker:
