const R = require('ramda')
const pgp = require('pg-promise')({
  capSQL: true
})

const columnSet = new pgp.helpers.ColumnSet(
  [
    'title',
    'category',
    {
      name: 'requirement',
      cast: 'text[]'
    },
    {
      name: 'target_audience',
      cast: 'text[]'
    },
    {
      name: 'goal',
      cast: 'text[]'
    },
    'image_url',
    'description',
    'content',
    'attended_msg',
    'price',
    'pre_price',
    'state',
    'min_number',
    'max_number',
    'location',
    'published',
    'deadline',
    'closing',
    'start_datetime',
    'end_datetime',
    'reached_datetime',
    {
      name: 'created_at',
      def: Date.now()
    },
    {
      name: 'updated_at',
      def: Date.now()
    }
  ], {
    table: 'workshop'
  }
)

var datas = [
  {
    title: '網頁設計',
    category: 'technology',
    requirement: ['editor'],
    target_audience: ['完全沒有基礎的人'],
    goal: ['拿現成模板做出自己的個人頁面，並發佈在 github.io'],
    image_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/19800716_1884959988494992_6434978593235602710_o.jpg?oh=9b457b0a44769904eb7414bbed73a02f&oe=59F3155E',
    description: 'description',
    content: 'content',
    attended_msg: 'welcome 網頁設計',
    price: 0,
    pre_price: 0,
    state: 'reached',
    min_number: 1,
    max_number: 15,
    location: 'online',
    published: true,
    deadline: +new Date(2017, 6, 13),
    closing: +new Date(2017, 6, 16),
    start_datetime: +new Date(2017, 6, 7),
    end_datetime: +new Date(2017, 7, 7),
    reached_datetime: +new Date(2017, 6, 6, 18),
    created_at: +new Date(2017, 6, 6),
    updated_at: +new Date(2017, 6, 6)
  }, {
    title: '平面設計 0 基礎入門系列工作坊',
    category: 'aesthetics',
    requirement: ['requirement'],
    target_audience: ['想要讓自己做出來的東西更美的人'],
    goal: ['自己完成一個完整的設計品'],
    image_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/19800716_1884959988494992_6434978593235602710_o.jpg?oh=9b457b0a44769904eb7414bbed73a02f&oe=59F3155E',
    description: 'description',
    content: 'content',
    attended_msg: 'welcome 平面設計 0 基礎入門系列工作坊',
    price: 200,
    pre_price: 50,
    state: 'judge_ac',
    min_number: 5,
    max_number: 8,
    location: 'NTHU',
    published: true,
    deadline: +new Date(2017, 6, 21),
    closing: +new Date(2017, 6, 24),
    start_datetime: +new Date(2017, 6, 31),
    end_datetime: +new Date(2017, 7, 14),
    reached_datetime: 0,
    created_at: +new Date(2017, 6, 14),
    updated_at: +new Date(2017, 14)
  }, {
    title: '3D列印與模型建立',
    category: 'technology',
    requirement: ['requirement'],
    target_audience: ['喜歡動手做東西的人'],
    goal: ['推廣自造者(maker)運動'],
    image_url: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/19800716_1884959988494992_6434978593235602710_o.jpg?oh=9b457b0a44769904eb7414bbed73a02f&oe=59F3155E',
    description: 'description',
    content: 'content',
    attended_msg: 'welcome 3D列印與模型建立',
    price: 0,
    pre_price: 0,
    state: 'judge_na',
    min_number: 10,
    max_number: 30,
    location: '清大創新育成大樓920室',
    published: false,
    deadline: +new Date(2017, 7, 17),
    closing: +new Date(2017, 7, 20),
    start_datetime: +new Date(2017, 8, 4),
    end_datetime: +new Date(2017, 8, 18),
    reached_datetime: 0,
    created_at: +new Date(2017, 7, 10),
    updated_at: +new Date(2017, 7, 10)
  }, {
    title: 'phase test: closed',
    state: 'reached',
    closing: +new Date(2017, 7, 1),
    start_datetime: +new Date(2018, 12, 31)
  }, {
    title: 'phase test: over',
    state: 'reached',
    closing: +new Date(2017, 7, 1),
    start_datetime: +new Date(2017, 7, 2)
  }, {
    title: 'phase test: reached',
    state: 'reached',
    closing: +new Date(2018, 12, 31),
    start_datetime: +new Date(2018, 12, 31)
  }
].map(R.merge({
  title: 'none',
  category: 'technology',
  requirement: [],
  target_audience: [],
  goal: [],
  image_url: '',
  description: 'desp',
  content: 'cnt',
  attended_msg: 'welcome',
  price: 0,
  pre_price: 0,
  state: 'judging',
  min_number: 1,
  max_number: 2,
  location: 'somewhere',
  published: true,  // develop purpose, all true, default should be false
  deadline: 0,
  closing: 0,
  start_datetime: 0,
  end_datetime: 0,
  reached_datetime: 0
}))

module.exports = {
  columnSet,
  datas
}
