const path = require('path')
const pgp = require('pg-promise')({
  promiseLib: require('bluebird')
})
require('app-module-path').addPath(path.join(__dirname, '../'))

const db = require('src/db')

const schemaSql = require('./schema')
const dataSql = require('./data')

db.none(schemaSql).then(() => {
  console.log('Schema created')
  return db.none(dataSql).then(() => {
    console.log('Data populated')
  }).catch(err => {
    console.log('Error populated data', err)
  })
}).catch(err => {
  console.log('Error creating schema', err)
}).finally(() => {
  pgp.end()
})
