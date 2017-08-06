function whereClause (conditions) {
  if (conditions.lenght === 0) { return '' }
  return 'WHERE ' + conditions.join(' AND ')
}

module.exports = {
  whereClause
}
