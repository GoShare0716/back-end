const R = require('ramda')
const { snakeCase } = require('change-case')

const db = require('src/db')
const error = require('src/error')
const sql = require('src/sql')
const utils = require('src/utils')

const adminOnlyFields = ['state']
// const authorOnlyFields = ['published']

module.exports = (workshopId, user, field, data) => {
  const dbField = snakeCase(field)
  const setFieldSql = `
UPDATE workshop
SET ${dbField} = $(data)
WHERE id = $(workshopId)
RETURNING ${dbField};
  `

  // only admin and author can set field
  if (utils.user.isAdmin(user)) {
    return db.one(setFieldSql, { workshopId, data })
  } else if (R.contains(field, adminOnlyFields)) {
    return Promise.reject(error.adminOnly)
  } else {
    return db.task(t => {
      const userId = user.id
      return t.one(sql.workshop.isAuthor, { workshopId, userId })
        .then(R.ifElse(
          utils.workshop.isAuthor,
          () => t.one(setFieldSql, { workshopId, data }),
          () => { throw error.authorOnly }
        ))
    })
  }
}
