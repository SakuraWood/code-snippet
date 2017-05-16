// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//main.js作为应用的入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import store from './store'
import TimeEntries from './components/TimeEntries'
import 'bootstrap/dist/css/bootstrap.css'

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.config.productionTip = false

//路由数组
const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
},{
  path : '/time-entries',
  component : TimeEntries,
  children : [{
    path : 'log-time',
    // 懒加载
    component : resolve => require(['./components/LogTime.vue'],resolve),
  }]
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
  // template: '<App/>',
  // components: { App }
});
