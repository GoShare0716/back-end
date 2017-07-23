const express = require('express')

const accessController = require('./middleware/access-controller.js')
const errorHandler = require('./middleware/error-handler.js')

const authRouter = require('./router/authentication.js')
const skillRouter = require('./router/skill.js')
const userRouter = require('./router/user.js')
const workshopRouter = require('./router/workshop.js')

const app = express()

const PORT = 3210
const API_URL = '/api'

app.use(accessController)

// app.use('/api', someRouter)
app.use(API_URL, authRouter)
app.use(API_URL, skillRouter)
app.use(API_URL, userRouter)
app.use(API_URL, workshopRouter)
app.get('/', (req, res) => {
  res.sendStatus(404)
})
app.get('/*', (req, res) => res.redirect('/'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is up and runnning on port(${PORT})...`)
})
