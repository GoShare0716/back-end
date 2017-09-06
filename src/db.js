const initOptions = {
  capSQL: true,
  promiseLib: require('bluebird'),
  receive: (data, result, e) => {
    camelizeColumns(data)
  },
  query: e => {
    console.log('=== QUERY ===')
    console.log(e.query)
    console.log('^^^ QUERY ^^^')
  },
  error: (error, e) => {
    if (e.query) {
      console.log('QUERY: ', e.query)
    }
    if (e.params) {
      console.log('PARAMS: ', e.params)
    }
    console.log(error)
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
