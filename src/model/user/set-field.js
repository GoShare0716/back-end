const db = require('src/db')
const {snakeCase} = require('change-case')

module.exports = (userId, field, data) => {
  // TODO field name might be camel case
  const dbField = snakeCase(field)
  const setFieldSql = `
UPDATE users
SET ${dbField} = $(data)
WHERE id = $(userId)
RETURNING ${dbField};
  `

  return db.one(setFieldSql, { userId, data })
}
