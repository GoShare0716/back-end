function whereClause (conditions) {
  if (conditions.length === 0) { return '' }
  return 'WHERE ' + conditions.join(' AND ')
}

module.exports = {
  whereClause
}
