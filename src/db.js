const initOptions = {
  capSQL: true,
  receive: (data, result, e) => {
    camelizeColumns(data)
  }
}

const pgp = require('pg-promise')(initOptions)

function camelizeColumns (data) {
  const tmp = data[0]
  for (let prop in tmp) {
    const camel = pgp.utils.camelize(prop)
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        d[camel] = d[prop]
        delete d[prop]
      }
    }
  }
}

require('src/config') // set DB_URL
const db = pgp(process.env.DB_URL)

module.exports = db
