<template lang="html">
  <div class="seller-wrapper" ref="seller">
    <div class="scroll-wrapper">
      <div class="seller-header">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <div class="score">
            <star :score="seller.score" :size="36"></star>
          </div>
          <span class="num">({{seller.ratingCount}}评价)</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="item">
            <h2>起送价</h2>
            <div class="content">
              <span>{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="item">
            <h2>商家配送</h2>
            <div class="content">
              <span>{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="item">
            <h2>平均配送时间</h2>
            <div class="content">
              <span>{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <!-- <favorite :favorite="favorite" :change-favorite="changeFavorite"></favorite> -->
        <favorite :favorite="favorite"></favorite>
      </div>
      <split></split>
      <div class="content">
        <h2 class="title">公告和活动</h2>
        <div class="desc-wrapper">
          <p class="desc">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-for="(support,index) in seller.supports">
            <span class="icon" :class="supportClass[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2>商家实景</h2>
        <div class="imgs-wrapper" ref='sellerImg'>
          <ul class="imgs">
            <li class="imgs-item" v-for="pic in seller.pics">
              <img :src="pic" alt="店家图片">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1>商家信息</h1>
        <div class="info-item" v-for="info in seller.infos">{{info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import split from './../split/split'
import star from './../star/star'
import favorite from './../favorite/favorite'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      favorite: true
    }
  },
  props: ['seller'],
  created () {
    console.log('seller created')
    this.supportClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // 生命周期详细了解
    if (this.seller.name) {
      this._initScroll()
    }
  },
  updated () {
    console.log('seller updated')
    // 刷新页面的时候不会触发created 所以需要updated
    this._initScroll()
  },
  components: {
    split,
    star,
    favorite
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        })

        const ulDom = this.$refs.sellerImg.children[0]
        const liNum = ulDom.children.length

        ulDom.style.width = liNum * (120 + 6) - 6 + 'px'
        this.imgScroll = new BScroll(this.$refs.sellerImg, {
          scrollX: true
        })
      })
    },
    changeFavorite ($event) {
      console.log(1)
      this.favorite = !this.favorite
    }
  }
}
</script>

<style lang="scss">
  @import "./../../../static/_mixin.scss";
  .seller-wrapper{
    width: 100%;
    position: absolute;
    top: 180px;
    bottom:0px;
    overflow: hidden;

    .seller-header{
      padding: 18px;

      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
      }

      .desc{
        position: relative;
        padding-bottom: 18px;
        @include border-after(1px,rgba(7,17,27,0.1));
        .score{
          display: inline-block;
          margin-right: 8px;
        }
        .num,.text{
          display: inline-block;
          line-height: 15px;
          font-size: 12px;
          vertical-align: top;
        }
      }

      .remark{
        padding-top:18px;
        display: flex;
        text-align: center;

        .item{
          flex: 1;

          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: #93999f
          }

          .content{
            line-height: 24px;
            font-size: 10px;
            color: #07111b;

            span{
              font-size: 24px;
            }
          }
        }

        .item:not(:last-child){
          border-right: 1px solid rgba(7,17,27,0.1);
        }
      }
    }

    .content{
      padding: 18px;

      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
      }

      .desc-wrapper{
        padding: 0 12px 16px 12px;
        position: relative;
        border: none;
        @include border-after(1px,rgba(7,17,27,0.1));

        .desc{
          line-height: 24px;
          font-size: 12px;
          color: #f01414
        }
      }

      .supports{

        li{
          padding:16px 12px;
          position: relative;
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;

            &.special{
              @include bg-image(special_4);
            }

            &.decrease{
              @include bg-image(decrease_4);
            }

            &.discount{
              @include bg-image(discount_4);
            }

            &.invoice{
              @include bg-image(invoice_4);
            }

            &.guarantee{
              @include bg-image(guarantee_4);
            }
          }

          .text{
            vertical-align: top;
            line-height: 16px;
            font-size: 12px;
            color: #07111b;
          }
        }

        li:not(:last-child){
          @include border-after(1px,rgba(7,17,27,0.1));
        }
      }
    }

    .pics{
      padding:12px 18px;

      h2{
        margin-bottom: 12px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
      }

      .imgs-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .imgs{

          li{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;

            img{
              width: 100%;
              height: 100%;
            }
          }

          li:last-child{
            margin-right: 0;
          }
        }
      }
    }

    .seller-info{
      padding: 18px;
      margin-bottom: 18px;

      h1,.info-item{
        position: relative;
        border: none;

        @include border-after(1px,rgba(7,17,27,0.1));
      }
      h1{
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
      }
      .info-item{
        padding: 16px 12px;
        line-height: 12px;
        font-size: 12px;
      }
    }
  }
</style>
