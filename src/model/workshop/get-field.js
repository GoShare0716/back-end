const db = require('src/db')

module.exports = (workshopId, field) => {
  const getFieldSql = `
SELECT
  ${field}
FROM workshop
WHERE id = $(workshopId);
`

  return db.one(getFieldSql, { workshopId })
}
