<template lang="html">
  <div class="ratings" ref="ratings">
    <div class="rating-header">
      <div class="rating-header-left">
        <div class="score">{{seller.score}}</div>
        <div class="title">综合评分</div>
        <div class="desc">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="rating-header-right">
        <div class="score-wrapper">
          <span class="text">服务态度</span>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="text">商品评分</span>
          <star :score="seller.foodScore" :size="36"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="text">送达速度</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <rateSelect :ratings="ratings"></rateSelect>
    <ul class="ratings-content">
      <li class="ratings-item">

      </li>
    </ul>
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios'
import star from './../star/star'
import split from './../split/split'
import rateSelect from './../rateSelect/rateSelect'
export default {
  data () {
    return {
      ratings: []
    }
  },
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  created () {
    axios({
      method: 'get',
      url: '/ele/ratings'
    }).then(res => {
      this.ratings = res.data.data
    })
  },
  components: {
    star,
    split,
    rateSelect
  }
}
</script>

<style lang="scss">
.ratings{
  position: absolute;
  top: 180px;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  .rating-header{
    display: flex;
    padding: 18px 0;

    .rating-header-left{
      flex:0 0 137px;
      width: 137px;
      padding: 6px 0;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);

      @media only screen and (max-width: 320px){
        flex: 0 0 120px;
        width: 120px;
      }

      .score{
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .desc{
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

    }

    .rating-header-right{
      flex:1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px){
        padding-left: 6px;
      }

      .score-wrapper{
        margin-bottom: 8px;
        font-size: 0;

        .text{
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star{
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score{
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper{
        font-size: 0;
        .text{
          display: inline-block;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .time{
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }



  }
}
</style>
