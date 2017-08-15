const R = require('ramda')
const moment = require('moment')
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
      def: moment().valueOf()
    },
    {
      name: 'updated_at',
      def: moment().valueOf()
    }
  ], {
    table: 'workshop'
  }
)

const FUTURE = moment().add(1, 'y').valueOf()
const PAST = moment().subtract(1, 'y').valueOf()

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
    deadline: FUTURE,
    closing: FUTURE,
    start_datetime: FUTURE,
    end_datetime: FUTURE,
    reached_datetime: moment('2017-06-06').valueOf(),
    created_at: PAST,
    updated_at: PAST
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
    deadline: FUTURE,
    closing: FUTURE,
    start_datetime: FUTURE,
    end_datetime: FUTURE,
    reached_datetime: 0,
    created_at: moment('2017-07-14').valueOf(),
    updated_at: moment('2017-07-14').valueOf()
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
    published: true,
    deadline: +new Date(2017, 7, 17),
    closing: +new Date(2017, 7, 20),
    start_datetime: +new Date(2017, 8, 4),
    end_datetime: +new Date(2017, 8, 18),
    reached_datetime: 0,
    created_at: +new Date(2017, 7, 10),
    updated_at: +new Date(2017, 7, 10)
  }, {
    title: 'TEST: phase - closed',
    state: 'reached',
    closing: PAST,
    start_datetime: FUTURE
  }, {
    title: 'TEST: phase - over',
    state: 'reached',
    closing: PAST,
    start_datetime: PAST
  }, {
    title: 'TEST: phase - reached',
    state: 'reached',
    closing: FUTURE,
    start_datetime: FUTURE
  }, {
    title: 'TEST: admin search - unpublished',
    published: false
  }, {
    title: 'TEST: unreached',
    state: 'judge_ac',
    deadline: PAST
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
