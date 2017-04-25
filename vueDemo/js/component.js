// 定义全局组件
Vue.component('my-component',{
  template : '<div>My first component!</div>'
});

Vue.component('my-button',{
  //组件中定义数据，只能用函数的形式
  data : function(){
    return {
      counter : 0
    };
  },
  template : '<button v-on:click="increment">点击的次数 :{{counter}}</button>',
  methods : {
    increment : function(){
      //此处的this 是VueComponent
      this.counter += 1;
      //触发事件事件。附加参数都会传给监听器回调
      this.$emit('increment');
    }
  }
});

//创建实例
new Vue({
  el : '#example-1',
  data : {
    inputvalue : ''
  },
  //定义局部的组件
  components : {
    'componentfor1' : {
      template : '<div><div>局部的component! 他的props : {{myProps}} 动态绑定的props为 ：{{vBindProps}}</div><input v-model="vBindProps"></input></div>',
      //要让子组件使用父组件的数据，我们需要通过子组件的props选项,子组件要显式地用 props 选项声明它期待获得的数据
      props : ['myProps','vBindProps']
    }
  }
});


new Vue({
  el : '#example-3',
  data : {
    count : 0
  },
  methods : {
    incrementForEvent : function(){
      //此处的this 是Vue实例
      this.count += 1;
    }
  }
});
