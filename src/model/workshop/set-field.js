const db = require('src/db')
const { snakeCase } = require('change-case')

module.exports = (workshopId, field, data) => {
  const dbField = snakeCase(field)
  const setFieldSql = `
UPDATE workshop
SET ${dbField} = $(data)
WHERE id = $(workshopId)
RETURNING ${dbField};
  `

  return db.one(setFieldSql, { workshopId, data })
}
