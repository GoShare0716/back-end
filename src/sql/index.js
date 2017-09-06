const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath, {minify: true})
}

module.exports = {
  skill: {
    create: sql('./skill/create.sql'),
    new: sql('./skill/new.sql'),
    view: sql('./skill/view.sql')
  },
  workshop: {
    attend: sql('./workshop/attend.sql'),
    attendInfo: sql('./workshop/attend-info.sql'),
    attendees: sql('./workshop/attendees.sql'),
    cancel: sql('./workshop/cancel.sql'),
    create: sql('./workshop/create.sql'),
    delete: sql('./workshop/delete.sql'),
    get: sql('./workshop/get.sql'),
    isAuthor: sql('./workshop/is-author.sql'),
    new: sql('./workshop/new.sql'),
    reached: sql('./workshop/reached.sql'),
    unreached: sql('./workshop/unreached.sql'),
    updateAll: sql('./workshop/update-all.sql'),
    updateByAuthor: sql('./workshop/update-by-author.sql'),
    updateWhenJudging: sql('./workshop/update-when-judging.sql')
  },
  user: {
    attendWorkshopsPublic: sql('./user/attend-workshops-public.sql'),
    createWorkshopsAll: sql('./user/create-workshops-all.sql'),
    createWorkshopsPublic: sql('./user/create-workshops-public.sql'),
    equipSkills: sql('./user/equip-skills.sql'),
    exist: sql('./user/exist.sql'),
    new: sql('./user/new.sql'),
    profile: sql('./user/profile.sql'),
    update: sql('./user/update.sql'),
    userLoginInfo: sql('./user/user-login-info.sql'),
    voteSkills: sql('./user/vote-skills.sql')
  },
  functionDeclaration: sql('./function-declaration.sql')
}
