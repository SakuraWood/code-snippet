<template lang="html">
  <section class="goods-wrapper">
    <section class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(food,index) in goods" :class="{current : index === currentIndex}" @click="clickMenu(index)">
          <span class="text"><span class="icon" :class="styles[food.type]" v-if="food.type > 0"></span>{{food.name}}</span>
        </li>
      </ul>
    </section>
    <section class="food-wrapper"></section>
  </section>
</template>

<script>
import axios from 'axios'
const OK = 1
export default {
  data () {
    return {
      goods: {},
      styles: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      currentIndex: 0
    }
  },
  methods: {
    clickMenu (index) {
      this.currentIndex = index
    }
  },
  created () {
    // 获取goods数据
    axios({
      method: 'get',
      url: '/ele/goods'
    }).then(response => {
      if (response.data.code === OK) {
        this.goods = response.data.data
      } else {
        console.log('get goods response error code')
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss">
  @import "../../../static/_mixin.scss";

  .goods-wrapper{
    width: 100%;
    overflow: hidden;
    //高度自适应
    position: absolute;
    top: 180px;
    bottom: 48px;
    //弹性布局
    display: flex;

    .menu-wrapper{
      //宽度固定,不伸缩
      flex: 0 0 80px;
      width: 80px;

      height: 100%;
      background: #f3f5f7;

      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;

        &.current{
          background-color: #fff;
          font-weight: 700;
          margin-top: -1px;
        }

        > span{
          display: table-cell;
          vertical-align: middle;
          width: 56px;
          position: relative;
          border: none;
          font-size: 12px;
          // 这种方式太粗
          // box-sizing: border-box;
          // border-bottom: 0.5px solid rgba(7,17,27,0.1);

          //使用伪类进行缩放 会展示的更细
          @include border-after(1px,rgba(7,17,27,0.1));

          .icon{
            display: inline-block;
            height: 12px;
            width: 12px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            vertical-align: top;

            &.special{
              @include bg-image(special_3);
            }

            &.decrease{
              @include bg-image(decrease_3);
            }

            &.discount{
              @include bg-image(discount_3);
            }

            &.invoice{
              @include bg-image(invoice_3);
            }

            &.guarantee{
              @include bg-image(guarantee_3);
            }
          }
        }
      }
    }

    .food-wrapper{
      flex: 1;
    }
  }
</style>
