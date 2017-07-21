const userTable = require('../table/user.js')

function friendThumbnail (id) {
  return {
    id,
    thumbnailUrl: userTable[id - 1].thumbnailUrl
  }
}

function select (props) {
  return obj => {
    let ret = {}
    for (let prop of props) {
      ret[prop] = obj[prop]
    }
    return ret
  }
}

function reject (props) {
  return obj => {
    let ret = obj
    for (let prop of props) {
      delete ret[prop]
    }
    return ret
  }
}

module.exports = {
  friendThumbnail,
  select,
  reject
}
