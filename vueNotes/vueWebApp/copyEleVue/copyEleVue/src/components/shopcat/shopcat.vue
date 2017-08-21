<template lang="html">
  <div>
    <div class="shopcat">
      <div class="shopcat-content">
        <div class="content-left">
          <div class="logo-wrapper" @click="toggleShow">
            <span class="fa fa-shopping-cart logo" :class="{active : hasNum}"></span>
            <div v-show="hasNum" class="num">{{count}}</div>
          </div>
          <div class="price">
            {{amount | price-format}}
          </div>
          <div class="des">
            另需要配送费{{deliveryPrice}}元
          </div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'not-enough' : !isEnough,enough : isEnough}" @click="goToPay">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="list">
      <div class="food-list" v-show="maskShow">
        <div class="food-header">
          <span class="title">购物车</span>
          <span class="clear-btn" @click="clearCart">清空</span>
        </div>
        <div class="food-list-wrapper" ref="foodListWrapper">
          <ul>
            <li class="food-item" v-for="food in foodList">
              <span class="food-name">{{food.name}}</span>
              <span class="food-price">￥{{food.price}}</span>
              <div class="control-wrapper">
                <cartcontrol :update-food-count='updateFoodCount' :food='food'></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="mask" v-show="maskShow"></div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from './../cartcontrol/cartcontrol'
export default {
  props: ['minPrice', 'deliveryPrice', 'foodList', 'updateFoodCount', 'clearCart'],
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    isEnough () {
      return this.amount >= this.minPrice
    },
    hasNum () {
      return this.count > 0
    },
    count () {
      let temp = 0
      if (this.foodList.length) {
        this.foodList.forEach(function (food, index) {
          temp += food.count
        })
      }
      return temp
    },
    amount () {
      let temp = 0
      if (this.foodList.length) {
        this.foodList.forEach(function (food, index) {
          temp += food.count * food.price
        })
      }
      if (this.count > 0) {
        return temp + this.deliveryPrice
      } else {
        return temp
      }
    },
    payText () {
      if (this.amount === this.deliveryPrice) {
        return `${this.minPrice}元起送`
      } else if (this.amount < this.minPrice) {
        return `还差${this.minPrice - this.amount}元起送`
      } else {
        return '去结算'
      }
    },
    maskShow () {
      if (this.count === 0) {
        this.isShow = false
        return false
      } else {
        return this.isShow
      }
    }
  },
  methods: {
    toggleShow () {
      if (this.count > 0) {
        this.isShow = !this.isShow

        if (this.isShow) {
          // 食物列表初始化betterScroll
          Vue.nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.foodListWrapper, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      }
    },
    goToPay () {
      if (this.isEnough) {
        alert(`you should pay ￥${this.amount}`)
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="scss">
@import "../../../static/_mixin.scss";
.shopcat{
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;

  .shopcat-content{
    display: flex;
    color: rgba(255, 255, 255, 0.4);
    background: #141d27;
    font-size: 0;

    .content-left{
      flex:1;

      .logo-wrapper{
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
        }
        .fa{
          line-height: 44px;
          font-size: 24px;
          color: #80858a;

          &.active{
            color:#fff;
          }
        }

        .num{
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        }
      }

      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 700;
      }
      .des{
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right{
      flex: 0 0 105px;
      width: 105px;
      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.not-enough{
          background: #2b333b;
        }
        &.enough{
          background: #00b43c;
          color: #fff
        }
      }
    }
  }

  .food-list{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index : -1;
    transform: translate3d(0,-100%,0);

    .food-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.1);

      .title{
        float: left;
        font-size: 14px;
        color: #07111b;
      }

      .clear-btn{
        float: right;
        font-size: 12px;
        color: #00a0dc;
      }
    }

    ul{
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background-color: #fff;

      .food-item{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        @include border-after(1px,rgba(7, 17, 27, 0.1));

        .food-name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .food-price{
          position: absolute;
          right: 100px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .control-wrapper{
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
  .list-enter-active,.list-leave-active{
    transition: all 0.4s;
  }
  .list-enter,.list-leave-to{
    transform: translate3d(0,0,0);
  }
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 40;
  opacity: 1;
  background: rgba(7,17,27,0.6);
}

.mask-enter-active,.mask-leave-active{
  transition: all 0.4s;
}
.mask-enter,.mask-leave-to{
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
</style>
