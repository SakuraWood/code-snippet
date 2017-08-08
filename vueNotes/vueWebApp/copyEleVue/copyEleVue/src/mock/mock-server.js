import data from './data.json'
import Mock from 'mockjs'

Mock.mock('/ele/goods', {
  code: 1,
  data: data.goods
})

Mock.mock('/ele/ratings', {
  code: 1,
  data: data.ratings
})

Mock.mock('/ele/seller', {
  code: 1,
  data: data.seller
})
