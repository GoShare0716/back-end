const db = require('src/db')

module.exports = (workshopId, field, data) => {
  // TODO field name might be camel case
  const setFieldSql = `
UPDATE workshop
SET ${field} = $(data)
WHERE id = $(workshopId)
RETURNING ${field};
  `

  return db.one(setFieldSql, { workshopId, data })
}
