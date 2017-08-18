<template lang="html">
  <div class="cat-control-wrapper">
    <div class="cat-content">
      <transition  name="reduce">
        <div class="cat-reduce fa fa-minus-circle" v-show="food.count" @click.stop="updateFoodCount(food,false,$event)"></div>
      </transition >
      <div class="cat-count" v-show="food.count">{{food.count}}</div>
      <div class="cat-add fa fa-plus-circle" @click="updateFoodCount(food,true,$event)"></div>
      <!-- <div class="cat-add fa fa-plus-circle" @click="changeObject"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
    updateFoodCount: Function
  },
  methods: {
    // changeObject () {
    //   if (this.testObject.age) {
    //     this.testObject.age ++
    //   } else {
    //     this.$set(this.testObject, 'age', 18)
    //   }
    // }
  }
}
</script>

<style lang="scss">
  .cat-content{
    .cat-reduce,.cat-count,.cat-add{
      display: inline-block;
    }
    .cat-reduce,.cat-add{
      color: #00a0dc;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
    }
    .reduce-leave-active,.reduce-enter-active{
      transition: all 0.4s linear
    }

    .reduce-enter,.reduce-leave-to{
      opacity: 0;
      transform: translateX(24px) rotate(180deg);
    }

    .cat-count{
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: #93999f;
    }
  }
</style>
