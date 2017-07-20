const express = require('express')

const errorHandler = require('./middleware/error-handler.js')
const accessController = require('./middleware/access-controller.js')

const app = express()

const PORT = 3000

app.use(accessController)

// app.use('/api', someRouter)
app.get('/*', (req, res) => res.redirect('/'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is up and runnning on port(${PORT})...`)
})
