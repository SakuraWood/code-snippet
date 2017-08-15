<template lang="html">
<div class="shopcat">
  <div class="shopcat-content">
    <div class="content-left">
      <div class="logo-wrapper">
        <span class="fa fa-shopping-cart logo" :class="{active : hasNum}"></span>
        <div v-show="hasNum" class="num">{{count}}</div>
      </div>
      <div class="price">
        ￥{{amount}}
      </div>
      <div class="des">
        另需要配送费{{deliveryPrice}}元
      </div>
    </div>
    <div class="content-right">
      <div class="pay" :class="{'not-enough' : !isEnough,enough : isEnough}">
        {{payText}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['minPrice', 'deliveryPrice', 'foodList'],
  data () {
    return {

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
    }
  }
}
</script>

<style lang="scss">
.shopcat{
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
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
}
</style>
