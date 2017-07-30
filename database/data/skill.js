const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [
    'name',
    'category',
    'description',
    'tag',
    'video_url',
    'visible',
    'created_at',
    'updated_at'
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
    created_at: 1500541846538,
    updated_at: 1500541846538
  }, {
    name: '平面設計',
    category: 'aesthetics',
    description: '泛指具有藝術性和專業性，以「視覺」作為溝通和表現的方式。透過多種方式來創造和結合符號、圖片和文字，藉此作出用來傳達想法或訊息的視覺表現。',
    tag: ['Design'],
    video_url: 'https://www.youtube.com/watch?v=80kGfeEAML4',
    visible: true,
    created_at: 1500542167429,
    updated_at: 1500542167429
  }, {
    name: 'Django',
    category: 'technology',
    description: 'Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.',
    tag: ['Web', 'Full Stack'],
    video_url: 'https://www.youtube.com/watch?v=FNQxxpM1yOs',
    visible: true,
    created_at: 1500542493618,
    updated_at: 1500542493618
  }
]

module.exports = {
  columnSet,
  datas
}
