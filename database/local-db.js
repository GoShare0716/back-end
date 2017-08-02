const path = require('path')
const pgp = require('pg-promise')()
require('app-module-path').addPath(path.join(__dirname, '../'))

const db = require('src/db')

const schemaSql = require('./schema')
const dataSql = require('./data')

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
