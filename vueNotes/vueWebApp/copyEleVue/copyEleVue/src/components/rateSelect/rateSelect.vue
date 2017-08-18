<template lang="html">
<div class="rateSelect">
  <div class="rate-type">
    <!-- 同时使用多个:class 会报错 所以需要放在同一个数组中 -->
    <div class="item"
         :class="[descItem.class,{active : descItem.active}]"
         v-for="(descItem,index) in desc" @click="changeType(index)">{{descItem.text}} {{nums[index]}}</div>
  </div>
  <div class="filter-content">
    <span class="box fa fa-check-circle" :class="{active : isByContent}" @click="byContent"></span>
    <span class="desc">只看有内容的评价</span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      desc: [
        {
          class: 'all',
          text: '全部',
          active: true
        },
        {
          class: 'enjoy',
          text: '满意',
          active: false
        },
        {
          class: 'notEnjoy',
          text: '不满意',
          active: false
        }
      ],
      isByContent: false
    }
  },
  props: ['ratings'],
  computed: {
    nums () {
      let temp = [0, 0, 0]
      this.ratings.forEach((value, index) => {
        if (value.rateType === 0) {
          temp[1]++
        } else if (value.rateType === 1) {
          temp[2]++
        }
      })
      temp[0] = this.ratings.length
      return temp
    }
  },
  methods: {
    changeType (showIndex) {
      this.desc.forEach((value, index) => {
        // 改变按钮样式
        if (index === showIndex) {
          value.active = true
        } else {
          value.active = false
        }
      })
      if (showIndex === 0) {
        this.$emit('change', 2)
      } else if (showIndex === 1) {
        this.$emit('change', 0)
      } else {
        this.$emit('change', 1)
      }
    },

    byContent () {
      this.isByContent = !this.isByContent

      this.$emit('change-content')
    }
  }
}
</script>

<style lang="scss">
@import "./../../../static/_mixin.scss";
  .rate-type{
    padding: 18px 0;
    margin: 0 18px;
    position: relative;
    border: none;
    font-size: 0;
    @include border-after(1px,rgba(7,17,27,0.1));

    .item{
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color: #4d555d;
    }

    .all{
      background: rgba(0,160,220,0.2);
    }
    .enjoy{
      background: rgba(0,160,220,0.1);
    }
    .notEnjoy{
      background: rgba(77,85,93,0.2);
    }

    .active{
      color: #fff;
      background: #00a0dc;
    }
  }

  .filter-content{
    padding: 0 18px;
    font-size: 0;
    position: relative;
    @include border-after(1px,rgba(7,17,27,0.1));


    .box{
      display: inline-block;
      padding: 8px 0;
      margin-right: 4px;
      font-size: 18px;
      line-height: 18px;
      color: #93999f;

      &.active{
        color: #00c850;
      }
    }

    .desc{
      display: inline-block;
      padding: 11px 0;
      font-size: 12px;
      line-height: 12px;
      vertical-align: top;
    }
  }
</style>
