<template>
  <div id="app">
    <ele-header :seller='seller'></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import header from './components/header/header'

const OK = 1

export default {
  data () {
    return {
      seller: {}
    }
  },
  created: function () {
    // 请求数据
    axios.get('/ele/seller').then(response => {
      const res = response.data
      if (res.code === OK) {
        this.seller = res.data
        console.log(this.seller)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  components: {
    'ele-header': header
  }
}
</script>

<style lang="scss">
@import './../static/_mixin.scss';
$tab-height : 40px;
#app{
  width: 100%;

  .tab{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height:$tab-height;
    line-height:$tab-height;
    position: relative;
    @include border-after(1px,rgba(7,17,27,0.1));

    .tab-item{
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      font-size: 14px;
      text-align: center;
      color:rgb(77,85,93);
      // router-link 激活状态时 自动添加class  router-link-active
      .router-link-active{
        color:rgb(240,20,20);
      }
    }
  }
}
</style>
