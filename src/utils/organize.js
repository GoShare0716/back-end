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

const organize = R.curry((targets, obj) => {
  // pairs :: [ [oldPath, newPath] ]
  const pairs = R.chain(R.prop(R.__, PATHES), targets)
  const moves = pairs.map(R.apply(move))
  return R.apply(R.pipe, moves)(obj)
})

module.exports = organize
