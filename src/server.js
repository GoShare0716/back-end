const express = require('express')
const pgp = require('pg-promise')()

const accessController = require('./middleware/access-controller')
const errorHandler = require('./middleware/error-handler')

// const authRouter = require('./router/authentication')
// const skillRouter = require('./router/skill')
// const userRouter = require('./router/user')
const workshopRouter = require('./router/workshop')

// set db uri, source env.sh(secret) first
require('../config.js')
global.db = global.db ? global.db : pgp(process.env.DB_URL)
global.__base = __dirname

const app = express()

const PORT = 3000
const API_URL = '/api'

// midddleware
app.use(accessController)

// router
// app.use(API_URL, authRouter)
// app.use(API_URL, skillRouter)
// app.use(API_URL, userRouter)
app.use(API_URL, workshopRouter)
// the other
app.get('/', (req, res) => {
  res.sendStatus(404)
})
app.get('/*', (req, res) => res.redirect('/'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is up and runnning on port(${PORT})...`)
})
