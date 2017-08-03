const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath, {minify: true})
}

module.exports = {
  skill: {
    create: sql('./skill/create.sql')
  },
  user: {
    getId: sql('./user/get-id.sql'),
    profile: sql('./user/profile.sql'),
    voteSkills: sql('./user/vote-skills.sql'),
    equipSkills: sql('./user/equip-skills.sql'),
    createWorkshops: sql('./user/create-workshops.sql'),
    attendWorkshops: sql('./user/attend-workshops.sql')
  },
  workshop: {
    new: sql('./workshop/new.sql'),
    create: sql('./workshop/create.sql')
  },
  functionDeclaration: sql('./function-declaration.sql')
}
