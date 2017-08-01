const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath, {minify: true})
}

module.exports = {
  workshop: {
    create: sql('./workshop/create.sql')
  },
  functionDeclaration: sql('./function-declaration.sql')
}
