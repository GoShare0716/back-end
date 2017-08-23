const fs = require('fs')
const moment = require('moment')
const R = require('ramda')

module.exports = function (err, req, res, next) {
  console.log(' === error ===')
  console.error(err)
  console.log(' ^^^ error ^^^')
  const log = `${moment().format()} ERROR: ${err.stack}\n\n`
  fs.appendFile('logs.txt', log, (err) => {
    if (err) console.error(err)
  })

  const status = err.status || 500
  const statusCode = R.cond([
    [R.equals(200), R.always('OK')],
    [R.equals(400), R.always('Bad Request')],
    [R.equals(401), R.always('Unauthorized')],
    [R.T, R.always('Internal Server Error')]
  ])(status)

  const msg = [
    statusCode,
    err.valueOf(),
    JSON.stringify(err, null, 2)
  ].join('\n')

  console.log('=== msg ===')
  console.log(msg)
  console.log('^^^ msg ^^^')

  // TODO: remove the msg(debug)
  res.status(status).send(msg)
}
