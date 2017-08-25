const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath, {minify: true})
}

module.exports = {
  skill: {
    new: sql('./skill/new.sql'),
    create: sql('./skill/create.sql'),
    view: sql('./skill/view.sql')
  },
  workshop: {
    attend: sql('./workshop/attend.sql'),
    attendInfo: sql('./workshop/attend-info.sql'),
    cancel: sql('./workshop/cancel.sql'),
    create: sql('./workshop/create.sql'),
    get: sql('./workshop/get.sql'),
    new: sql('./workshop/new.sql'),
    reached: sql('./workshop/reached.sql'),
    unreached: sql('./workshop/unreached.sql')
  },
  user: {
    userLoginInfo: sql('./user/user-login-info.sql'),
    profile: sql('./user/profile.sql'),
    voteSkills: sql('./user/vote-skills.sql'),
    equipSkills: sql('./user/equip-skills.sql'),
    new: sql('./user/new.sql'),
    update: sql('./user/update.sql'),
    createWorkshopsPublic: sql('./user/create-workshops-public.sql'),
    createWorkshopsAll: sql('./user/create-workshops-all.sql'),
    attendWorkshopsPublic: sql('./user/attend-workshops-public.sql')
  },
  functionDeclaration: sql('./function-declaration.sql')
}
