<template lang="html">
  <section class="goods-wrapper">
    <section class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(food,index) in goods" :class="{current : index === currentIndex}" @click="clickMenu(index,$event)">
          <span class="text"><span class="icon" :class="styles[food.type]" v-if="food.type > 0"></span>{{food.name}}</span>
        </li>
      </ul>
    </section>
    <section class="food-wrapper" ref="foodWrapper">
      <ul class="food-list">
        <li class="food-item" v-for="(food,index) in goods">
          <h1 class="food-title">{{food.name}}</h1>
          <ul>
            <li class="food-item-li" v-for="foodItem in food.foods">
              <div class="icon">
                <img :src="foodItem.icon" alt="食物图标">
              </div>
              <div class="content">
                <h2 class="title">{{foodItem.name}}</h2>
                <p class="des">{{foodItem.description}}</p>
                <div class="extra">
                  <span class="count">月售{{foodItem.sellCount}}</span>
                  <span>好评率{{foodItem.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">{{foodItem.price | price-format}}</span>
                  <span class="old" v-if="foodItem.oldPrice">{{foodItem.price | price-format}}</span>
                </div>
                <catcontrol :food="foodItem" :update-food-count="updateFoodCount"></catcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <shopcat :food-list="foodList" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice" :update-food-count='updateFoodCount' :clear-cart='clearCart'></shopcat>
  </section>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import catcontrol from './../cartcontrol/cartcontrol'
import shopcat from './../shopcat/shopcat.vue'

const OK = 1
export default {
  props: ['seller'],
  data () {
    return {
      goods: [],
      styles: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      scrollY: 0,
      tops: []
    }
  },
  computed: {
    currentIndex () {
      const {tops, scrollY} = this
      return tops.findIndex((top, index) => {
        return top <= scrollY && scrollY < tops[index + 1]
      })
    },
    foodList () {
      const temp = []
      this.goods.forEach((good, index) => {
        good.foods.forEach((food, index) => {
          if (food.count) {
            temp.push(food)
          }
        })
      })
      return temp
    }
  },
  methods: {
    clickMenu (index, event) {
      // _constructed时 better-scroll添加的属性   此处用来过滤掉原生的DOM事件
      if (!event._constructed) {
        return false
      }
      this.foodScroll.scrollToElement(this.$refs.foodWrapper.getElementsByClassName('food-item')[index], 300)
    },
    updateFoodCount (food, isAdd, e) {
      if (!e._constructed) {
        return false
      }

      if (isAdd) {
        if ('count' in food) {
          food.count ++
        } else {
          this.$set(food, 'count', 1)
        }
      } else {
        if (food.count > 0) {
          food.count --
        }
      }
    },
    clearCart () {
      this.foodList.forEach(function (value, index) {
        value.count = 0
      })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })

      // 监听滚动事件 记录food区的滑动距离
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
        // console.log(this.scrollY)
      })
    },
    _initTops () {
      const tops = this.tops
      const foodList = this.$refs.foodWrapper.getElementsByClassName('food-item')
      var listY = 0

      // 第一个列表
      tops.push(listY)
      // foodList不是数组   foodList instanceof Array 为 false
      // 将 foddList 转化为 数组  ES5 : [].slice.call(foodList) 或者 Array.prototype.slice.call(foodList)    ES6 : [...foodList]

      ;[...foodList].forEach((currentElement, index) => {
        listY += currentElement.clientHeight
        tops.push(listY)
      })
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

        // 和DOM相关的操作 一定要等待DOM更新之后再进行操作
        Vue.nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      } else {
        console.log('get goods response error code')
      }
    }).catch(error => {
      console.log(error)
    })
  },
  components: {
    catcontrol,
    shopcat
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

      > ul{
        .food-title{
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: #93999f;
          background-color: #f3f5f7;
        }

        .food-item-li{
          display: flex;
          margin: 18px 18px 0;
          position: relative;
          padding-bottom: 18px;

          &:not(:last-child){
            @include border-after(1px,rgba(7, 17, 27, 0.1));
          }

          .icon{
            flex: 0 0 57px;
            margin-right: 10px;

            img{
              width: 100%;
            }
          }

          .content{
            flex: 1;

            h2{
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }

            .extra,.des{
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }

            .des{
              line-height: 12px;
              margin-bottom: 8px;
            }

            .extra{
              .count{
                margin-right: 12px;
              }
            }

            .price{
              font-weight: 700;
              line-height: 24px;

              .now{
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240, 20, 20);
              }

              .old{
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }

            .cat-control-wrapper{
              position: absolute;
              right: 0;
              bottom: 12px;
            }
          }

        }
      }
    }
  }
</style>
