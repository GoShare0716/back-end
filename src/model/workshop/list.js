const db = require('src/db')

module.exports = function (query) {
  const sql = `
SELECT
    id,
    image_url,
    title,
    min_number,
    max_number,
    deadline,
    closing,
    description,
    price,
    category
FROM workshop
WHERE
    ($(category) = 'all' OR category = $(category)) AND
    ($(searchText) = '' OR title ILIKE '%$(searchText:value)%')
;`

  return db.any(sql, query)
}
