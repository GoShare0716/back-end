const fs = require('fs')
const moment = require('moment')

module.exports = function (err, req, res, next) {
  // console.error(err)

  const log = `${moment().unix()} ERROR  ${err.stack}\n`
  fs.appendFile('logs.txt', log, (err) => {
    if (err) console.error(err)
  })

  const status = err.status || 500
  var statusCode
  switch (status) {
    case 200: statusCode = 'OK'; break
    case 400: statusCode = 'Bad Request'; break
    case 401: statusCode = 'Unauthorized'; break
    default: statusCode = 'Internal Server Error'
  }
  var msg = [
    statusCode,
    err,
    JSON.stringify(err),
    Error().stack
  ]
  msg = msg.join('\n')
  console.log(msg)

    // TODO: remove this when production, security reason
  res.status(status).send(msg)

    // res.sendStatus(err.status ? err.status : 500);
    // next(err);
}
