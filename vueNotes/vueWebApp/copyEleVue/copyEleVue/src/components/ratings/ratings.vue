<template lang="html">
  <div class="ratings" ref="ratings">
    <!-- 需要加一层包裹 不然无法滚动 BScroll 貌似按照第一个子元素进行判断 -->
    <div>
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
      <rateSelect :ratings="ratings" v-on:change="changeSelectType" v-on:change-content="isByContent"></rateSelect>
      <ul class="ratings-content">
        <li class="ratings-item" v-for="ratingItem in selectRateings">
          <div class="avatar-wrapper">
            <img :src="ratingItem.avatar" alt="用户头像">
          </div>
          <div class="rating-content">
            <div class="content-header">
              <h1 class="name">{{ratingItem.username}}</h1>
              <span class="time">{{ratingItem.rateTime | date-format}}</span>
            </div>
            <div class="score-wrapper">
              <star :score="ratingItem.score" :size="24"></star>
              <span class="delivery-time">{{ratingItem.deliveryTime}}分钟送达</span>
            </div>
            <p class="desc">{{ratingItem.text}}</p>
            <div class="recommend">
              <span class="islike fa" :class="ratingItem.rateType === 0 ? 'fa-thumbs-o-up' : 'fa-thumbs-o-down'"></span>
              <span class="recommend-food" v-for="recommend in ratingItem.recommend">{{recommend}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import star from './../star/star'
import split from './../split/split'
import rateSelect from './../rateSelect/rateSelect'
export default {
  data () {
    return {
      ratings: [],
      selectType: 2,
      byContent: false
    }
  },
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  computed: {
    selectRateings () {
      // var temp = []
      // if (this.selectType === 2) {
      //   temp = this.ratings
      // } else {
      //   this.ratings.forEach((value, index) => {
      //     if (value.rateType === this.selectType) {
      //       temp.push(value)
      //     }
      //   })
      // }
      // return temp
      if (this.selectType === 2) {
        if (this.byContent === true) {
          return this.ratings.filter((value, index) => {
            return value.text !== ''
          })
        } else {
          return this.ratings
        }
      } else {
        return this.ratings.filter((value, index) => {
          if (this.byContent === true) {
            return (value.rateType === this.selectType) && (value.text !== '')
          } else {
            return value.rateType === this.selectType
          }
        })
      }
    }
  },
  methods: {
    changeSelectType (type) {
      this.selectType = type

      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    isByContent () {
      this.byContent = !this.byContent

      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  created () {
    axios({
      method: 'get',
      url: '/ele/ratings'
    }).then(res => {
      this.ratings = res.data.data

      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    }).catch(error => {
      alert(error)
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
@import "./../../../static/_mixin.scss";
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

  .ratings-content{
    padding: 0 18px;

    .ratings-item{
      padding: 18px 0;
      position: relative;
      display: flex;
      @include border-after(1px,rgba(7,17,27,0.1));

      .avatar-wrapper{
        flex: 0 0 28px;
        margin-right: 18px;

        img{
          width: 100%;
          border-radius: 50%;
        }
      }

      .rating-content{
        flex: 1;

        .content-header{
          position: relative;
          .name,.time{
            display: inline-block;
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: #07111b;
          }

          .time{
            float: right;
            margin-top: 5px;
            color: #93999f;
          }
        }

        .score-wrapper{
          margin-bottom: 6px;
          font-size: 0;

          .star{
            display: inline-block;
            margin-right: 5px;
          }

          .delivery-time{
            display: inline-block;
            font-size: 10px;
            line-height: 10px;
            color: #93999f;
            vertical-align: top;
          }
        }

        .desc{
          margin-bottom: 8px;
          line-height: 18px;
          color: #07111b;
          font-size: 12px;
        }

        .recommend{
          margin-bottom: 8px;
          line-height: 16px;
          span{
            display: inline-block;
            font-size: 12px;
            margin:0 8px 4px 0;
          }

          .recommend-food{
            box-sizing: border-box;
            padding: 0 6px;
            border: 1px solid rgba(7,17,27,0.1);
            border-radius: 1px;
            color: #93999f;
            background: #fff;
          }

          .fa-thumbs-o-up{
            color: #00a0dc;
          }

          .fa-thumbs-o-down{
            color: #93999f;
          }
        }
      }
    }
  }
}
</style>
