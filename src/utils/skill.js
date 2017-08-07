const R = require('ramda')

const copy = R.curry((oldPath, newPath, obj) =>
  R.assocPath(newPath, R.path(oldPath, obj), obj)
)

const move = R.curry((oldPath, newPath, obj) =>
  R.compose(
    R.dissocPath(oldPath),
    copy(oldPath, newPath)
  )(obj)
)

function splitCamel (text) {
  // eg, 'voteBasicNumber' -> ['vote', 'basic', 'number']
  const reg = /((?:^|[A-Z])[a-z]+)/g
  return text.match(reg).map(R.toLower)
}

const organize = R.pipe.apply(null,
  [
    'voteLevel',
    'equipLevel',
    'voteBasicNumber',
    'voteAdvancedNumber',
    'equipBasicNumber',
    'equipAdvancedNumber'
  ]
  .map(text => [[text], splitCamel(text)])
  .map(([oldPath, newPath]) => move(oldPath, newPath))
)

function adapter (skill) {
  return organize(skill)
}

// const skill = JSON.parse(`
// {
//     "id": 3,
//     "name": "Django",
//     "category": "technology",
//     "description": "Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
//     "tag": [
//         "Web",
//         "Full Stack"
//     ],
//     "visible": true,
//     "videoUrl": "https://www.youtube.com/watch?v=FNQxxpM1yOs",
//     "createdAt": "1500542493618",
//     "updatedAt": "1500542493618",
//     "voteBasicNumber": 2,
//     "voteAdvancedNumber": 2,
//     "equipBasicNumber": 2,
//     "equipAdvancedNumber": 2,
//     "equipLevel": "basic",
//     "voteLevel": "basic"
// }
// `)
// console.log(JSON.stringify(adapter(skill), null, 2))

module.exports = {
  adapter
}
