const R = require('ramda')
const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [
    'name',
    'role',
    'email',
    'fb_id',
    'access_token',
    'thumbnail_url',
    'picture_url',
    'introduction',
    {
      name: 'available',
      def: genAvai()
    },
    {
      name: 'created_at',
      def: Date.now()
    }
  ], {
    table: 'users'
  }
)

var datas = [
  {
    name: '張嘉軒',
    role: 'member',
    email: 'ookk8282@gmail.com',
    fb_id: '1514864711922034',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p40x40/16426235_1335337256541448_4112461475677668738_n.jpg?oh=44bcbeb78e0f146ae8a22b56e20fd444&oe=5A0AD7C3',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p240x240/16426235_1335337256541448_4112461475677668738_n.jpg?oh=ad639f0d623029c602a74d6a54bb0d35&oe=5A0E3AB1',
    introduction: 'intro',
    available: genAvai(10, 16, 20),
    created_at: +new Date(2017, 6, 3)
  }, {
    name: '賴詰凱',
    role: 'admin',
    // role: 'member',
    email: 'skyle0115@gmail.com',
    fb_id: '1833867746937550',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.31.80.80/p80x80/18622427_1859238271067164_3869120362467491071_n.jpg?oh=2c4879f3c50e4ed99de714439435ce08&oe=59F71BC3',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.93.240.240/p240x240/18622427_1859238271067164_3869120362467491071_n.jpg?oh=657cea4638763d6ebb3fc90ed90ddc4f&oe=5A02C22A',
    introduction: 'intro',
    available: genAvai(1, 2, 3, 8, 14, 15, 19, 20),
    created_at: +new Date(2017, 5, 12)
  }, {
    name: '林湘庭',
    role: 'member',
    email: 'empty',
    fb_id: '1194279457367537',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p80x80/14915540_1715220865464246_4727687316731100143_n.jpg?oh=ad9590fd0ee9b970cf82e2cd35bfb70d&oe=59C4DCB2',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p240x240/14915540_1715220865464246_4727687316731100143_n.jpg?oh=9527e4dbccd5eeb02dbba706ba64de92&oe=5A10AA18',
    introduction: 'intro',
    available: genAvai(0, 5, 14, 18),
    created_at: +new Date(2017, 5, 10)
  }
].map(R.merge({
  name: 'name',
  role: 'member',
  email: 'email@google.com',
  fb_id: '',
  thumbnail_url: '',
  picture_url: '',
  introduction: 'introduction'
}))

function genAvai () {
  let arr = Array(21).fill(false)
  for (let x of arguments) {
    arr[x] = true
  }
  return arr
}

for (let x of datas) {
  x.access_token = process.env[`ACCESS_TOKEN_${x.fb_id}`]
}

module.exports = {
  columnSet,
  datas
}
