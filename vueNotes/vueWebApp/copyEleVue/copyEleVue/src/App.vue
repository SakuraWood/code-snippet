<template>
  <div id="app">
    <ele-header></ele-header>
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
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header'

export default {
  components: {
    'ele-header': header
  }
}
</script>

<style lang="scss">
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
    border: 1px rgba(7,17,27,0.1);

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
