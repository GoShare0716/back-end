const R = require('ramda')
const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [
    'name',
    'category',
    'description',
    {
      name: 'tag',
      cast: 'text[]'
    },
    'video_url',
    'visible',
    {
      name: 'created_at',
      def: Date.now()
    },
    {
      name: 'updated_at',
      def: Date.now()
    }
  ], {
    table: 'skill'
  }
)

var datas = [
  {
    name: 'Javascript',
    category: 'technology',
    description: 'JavaScript (JS) is a programming language mostly used client-side to dynamically script webpages, but often also server-side.',
    tag: ['程式語言', 'Web'],
    video_url: 'https://www.youtube.com/watch?v=Ukg_U3CnJWI',
    visible: true,
    created_at: +new Date(2017, 7, 12),
    updated_at: +new Date(2017, 7, 12)
  }, {
    name: '平面設計',
    category: 'aesthetics',
    description: '泛指具有藝術性和專業性，以「視覺」作為溝通和表現的方式。透過多種方式來創造和結合符號、圖片和文字，藉此作出用來傳達想法或訊息的視覺表現。',
    tag: ['Design'],
    video_url: 'https://www.youtube.com/watch?v=80kGfeEAML4',
    visible: true,
    created_at: +new Date(2017, 7, 26),
    updated_at: +new Date(2017, 7, 26)
  }, {
    name: 'Django',
    category: 'technology',
    description: 'Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.',
    tag: ['Web', 'Full Stack'],
    video_url: 'https://www.youtube.com/watch?v=FNQxxpM1yOs',
    visible: true,
    created_at: +new Date(2016, 12, 30),
    updated_at: +new Date(2016, 12, 30)
  }
].map(R.merge({
  name: 'name',
  category: 'null',
  description: 'description',
  tag: [],
  video_url: '',
  visible: true // development purpose, should be false
}))

module.exports = {
  columnSet,
  datas
}
