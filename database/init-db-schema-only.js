const path = require('path')
const pgp = require('pg-promise')({
  promiseLib: require('bluebird')
})
require('app-module-path').addPath(path.join(__dirname, '../'))

const db = require('src/db')

const schemaSql = require('./schema')

db.none(schemaSql).then(() => {
  console.log('Schema created')
}).catch(err => {
  console.log('Error creating schema', err)
}).finally(() => {
  pgp.end()
})
