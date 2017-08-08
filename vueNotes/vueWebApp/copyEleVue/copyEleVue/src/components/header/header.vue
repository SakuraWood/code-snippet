<template lang="html">
  <header class="header-wrapper">
    <section class="content-wrapper">
      <div class="avatar">
        <img :src=seller.avatar alt="商家图标">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <!-- 加入v-if 判断是否有supports 避免渲染时会有undefined报错 -->
        <div class="support" v-if="seller.supports">
          <span class="saleWay" :class="styleList[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" @click.stop="showDetail" v-if="seller.supports">
          <span class="text">{{seller.supports.length}}个</span>
          <span class="fa fa-angle-right"></span>
        </div>
      </div>
    </section>
    <section class="bulletin-wrapper" @click.stop="showDetail">
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <span class="fa fa-angle-right"></span>
    </section>

    <transition name="details">
      <section class="details" v-show="isShowDetail" @click.stop="showDetail">
        <div class="name">{{seller.name}}</div>
        <div class="title">
          <span class="line"></span>
          <span class="text">优惠信息</span>
          <span class="line"></span>
        </div>
        <div class="supports">
          <div class="support" v-for="support in seller.supports">
            <span class="saleWay" :class="styleList[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </div>
        </div>
        <div class="title">
          <span class="line"></span>
          <span class="text">商家公告</span>
          <span class="line"></span>
        </div>
        <div class="content">
          <p>{{seller.bulletin}}</p>
        </div>
        <div class="close">

        </div>
      </section>
    </transition >

  </header>
</template>

<script>
export default {
  data () {
    return {
      styleList: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      isShowDetail: false
    }
  },
  props: ['seller'],
  methods: {
    showDetail: function () {
      this.isShowDetail = !this.isShowDetail
    }
  }
}
</script>

<style lang="scss">
  @import "../../../static/_mixin.scss";
  .header-wrapper{
    position: relative;
    background-color: rgba(7,17,27,0.5);
    color: white;
    overflow: hidden;

    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;

      .avatar{
        display: inline-block;
        vertical-align: top;
        width: 64px;
        height: 64px;

        img{
          width: 100%;
        }
      }

      .content{
        display: inline-block;
        margin-left: 16px;
        padding: 2px 0 2px;

        .title{
          .brand{
            display: inline-block;
            width: 30px;
            height: 18px;
            // vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 30px 18px;
            @include bg-image(brand);
          }

          .name{
            line-height: 18px;
            font-weight: bold;
            vertical-align: top;
            margin-left: 6px;
            font-size: 16px;
          }
        }

        .description{
          margin-top: 8px;
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
          font-weight: 200;
        }

        .support-count{
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          position: absolute;
          right: 12px;
          bottom: 18px;
          height: 24px;
          padding: 4px 8px;
          box-sizing: border-box;

          .text{
            font-size: 10px;
            line-height: 12px;
            font-weight: 200;
          }

          .fa{
            line-height: 14px;
          }
        }
      }

    }

    .bulletin-wrapper{
      position: relative;
      padding: 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 28px;
      line-height: 28px;
      background: rgba(7,17,27,0.2);

      .icon{
        display: inline-block;
        width: 22px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: 22px 12px;
        vertical-align: middle;
        @include bg-image(bulletin);
      }

      .text{
        margin: 0 4px;
        font-size: 10px;
        font-weight: 200;
      }

      .fa{
        display: inline-block;
        position: absolute;
        right: 3px;
        top: 7px;
        height: 12px;
        width: 12px;
      }
    }

    .details{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(7,17,27,0.8);
      z-index: 100;
      padding: 64px 0 32px;

      .name{
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .title{
        display: flex;
        position: relative;
        padding: 28px 36px 24px;

        .line{
          flex: 1;
          height: 2px;
          position: relative;
          top: 6px;
          background: rgba(255,255,255,0.2);
        }

        .text{
          padding: 0 12px;
        }
      }

      .supports{
        padding: 0 48px;

        .support{
          margin-bottom: 12px;
        }

      }

      .content{
        padding: 0 48px;
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
      }
    }

    .support{
      .saleWay{
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
      }

      .saleWay.decrease{
        @include bg-image(decrease_1);
      }
      .saleWay.discount{
        @include bg-image(discount_1);
      }
      .saleWay.guarantee{
        @include bg-image(guarantee_1);
      }
      .saleWay.invoice{
        @include bg-image(invoice_1);
      }
      .saleWay.special{
        @include bg-image(special_1);
      }

      .text{
        margin-left: 4px;
        font-size: 12px;
        line-height: 11px;
        font-weight: 200;
        vertical-align: top;
      }
    }

    // 加入动画效果
    .details-enter,.details-leave-to{
      opacity: 0;
    }

    .details-enter-active,.details-leave-active{
      transition: opacity .3s linear;
    }
  }
</style>
