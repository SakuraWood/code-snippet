// 定义全局组件
Vue.component('my-component',{
  template : '<div>My first component!</div>'
});

//创建根实例
new Vue({
  el : '#example-1',
  //定义局部的组件
  components : {
    'componentfor1' : {
      template : '<div>局部的component!</div>'
    }
  }
});

new Vue({
  el : '#example-3'
});
