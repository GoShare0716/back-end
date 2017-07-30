const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [
    'name',
    'email',
    'access_token',
    'thumbnail_url',
    'picture_url',
    'introduction',
    'available',
    'created_at'
  ], {
    table: 'users'
  }
)

var datas = [
  {
    name: '張嘉軒',
    email: 'ookk8282@gmail.com',
    access_token: '404',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p40x40/16426235_1335337256541448_4112461475677668738_n.jpg?oh=44bcbeb78e0f146ae8a22b56e20fd444&oe=5A0AD7C3',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p240x240/16426235_1335337256541448_4112461475677668738_n.jpg?oh=ad639f0d623029c602a74d6a54bb0d35&oe=5A0E3AB1',
    introduction: 'intro',
    available: genAvai(10, 16, 20),
    created_at: 1500542940003
  }, {
    name: '賴詰凱',
    email: 'skyle0115@gmail.com',
    access_token: '404',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.31.80.80/p80x80/18622427_1859238271067164_3869120362467491071_n.jpg?oh=2c4879f3c50e4ed99de714439435ce08&oe=59F71BC3',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.93.240.240/p240x240/18622427_1859238271067164_3869120362467491071_n.jpg?oh=657cea4638763d6ebb3fc90ed90ddc4f&oe=5A02C22A',
    introduction: 'intro',
    available: genAvai(1, 2, 3, 8, 14, 15, 19, 20),
    created_at: 1500543201840
  }, {
    name: '林湘庭',
    email: 'empty',
    access_token: '404',
    thumbnail_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p80x80/14915540_1715220865464246_4727687316731100143_n.jpg?oh=ad9590fd0ee9b970cf82e2cd35bfb70d&oe=59C4DCB2',
    picture_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p240x240/14915540_1715220865464246_4727687316731100143_n.jpg?oh=9527e4dbccd5eeb02dbba706ba64de92&oe=5A10AA18',
    introduction: 'intro',
    available: genAvai(0, 5, 14, 18),
    created_at: 1500543319362
  }
]

function genAvai () {
  let arr = Array(21).fill(false)
  for (let x of arguments) {
    arr[x] = true
  }
  return arr
}

module.exports = {
  columnSet,
  datas
}
