const pgp = require('pg-promise')()

require('../config.js')

const db = pgp(process.env.DB_URL)

const schemaSql = require('./schema/index.js')
const dataSql = require('./data/index.js')

db.none(schemaSql)
  .then(() => {
    console.log('Schema created')
    db.none(dataSql)
      .then(() => {
        console.log('Data populated')
        pgp.end()
      }).catch(err => {
        console.log('Error populated data', err)
        pgp.end()
      })
  })
  .catch(err => {
    console.log('Error creating schema', err)
    pgp.end()
  })
