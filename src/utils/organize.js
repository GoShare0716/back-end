const R = require('ramda')

const copy = R.curry((oldPath, newPath, obj) =>
  R.assocPath(newPath, R.path(oldPath, obj), obj)
)

const move = R.curry((oldPath, newPath, obj) =>
  R.pipe(
    copy(oldPath, newPath),
    R.dissocPath(oldPath)
  )(obj)
)

const rename = R.curry((x, y, obj) =>
  R.pipe(
    R.assoc(y, R.prop(x, obj)),
    R.dissoc(x)
  )(obj)
)
// TODO improve this shit
const PATHES = {
  vote: [
    [['voteLevel'], ['vote', 'level']],
    [['voteBasicNumber'], ['vote', 'basic', 'number']],
    [['voteAdvancedNumber'], ['vote', 'advanced', 'number']]
  ],
  equip: [
    [['equipLevel'], ['equip', 'level']],
    [['equipBasicNumber'], ['equip', 'basic', 'number']],
    [['equipAdvancedNumber'], ['equip', 'advanced', 'number']]
  ],
  author: [
    [['authorId'], ['author', 'id']],
    [['authorName'], ['author', 'name']],
    [['authorPictureUrl'], ['author', 'pictureUrl']],
    [['authorFbUrl'], ['author', 'fbUrl']],
    [['authorPersonalWebUrl'], ['author', 'personalWebUrl']],
    [['authorIntroduction'], ['author', 'introduction']]
  ],
  attendees: [
    [['attendeesNumber'], ['attendees', 'number']],
    [['friends'], ['attendees', 'friends']]
  ]
}

// const log = R.tap(x => console.log(JSON.stringify(x, null, 2)))

const organize = R.curry((targets, obj) => {
  // pairs :: [ [oldPath, newPath] ]
  const pairs = R.chain(R.prop(R.__, PATHES), targets)
  const moves = pairs.map(R.apply(move))

  const preFriends = obj => {
    if (!R.contains('attendees', targets)) {
      return R.identity(obj)
    }
    const xs = ['friendsId', 'friendsName', 'friendsThumbnailUrl']
    const ys = ['id', 'name', 'thumbnailUrl']
    const renameActions = R.apply(R.pipe,
      R.map(R.apply(rename), R.zip(xs, ys))
    )
    const friends = R.pipe(
      renameActions,
      R.toPairs,
      R.map(
        R.adjust(R.filter(R.complement(R.isNil)), 1)
      ),
      R.map(
        ([key, values]) => R.map(R.pair(key), values)
      ),
      R.transpose,
      R.map(R.fromPairs)
    )(R.pick(xs, obj))

    return R.pipe(
      R.omit(xs),
      R.assoc('friends', friends)
    )(obj)
  }
  const actions = R.prepend(preFriends, moves)

  return R.apply(R.pipe, actions)(obj)
})

module.exports = organize
