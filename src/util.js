const userTable = require('./table/user.js')
const {
  friendLists
} = require('./table/other.js')

function isFriend (userId) {
  const friendList = friendLists[userId - 1]
  return function (id) {
    // eg, ids.filter(isFriend(userId))
    return friendList.indexOf(id) !== -1
  }
}

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
  isFriend,
  friendThumbnail,
  select,
  reject
}
