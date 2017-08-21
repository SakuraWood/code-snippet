// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import语句会执行所加载的模块  拦截ajax请求，并模拟返回数据
import './mock/mock-server'
// 引入时间处理模块
import moment from 'moment'

Vue.config.productionTip = false

// 注册全局的过滤器
Vue.filter('date-format', function (value) {
  return moment(value).format('YYYY MM DD HH:mm:ss')
})

Vue.filter('price-format', function (value) {
  return `￥${value}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
