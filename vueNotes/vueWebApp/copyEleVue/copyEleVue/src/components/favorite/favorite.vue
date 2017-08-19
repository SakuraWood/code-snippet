<template lang="html">
  <div class="favorite" @click="changeFavorite">
    <span class="icon fa fa-heart" :class="isF ? 'is' : 'not'"></span>
    <span class="text">{{isF ? '已收藏' : '收藏'}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isF: false
    }
  },
  props: ['favorite'],
  created () {
    this.$set(this, 'isF', this.favorite)
  },
  methods: {
    changeFavorite () {
      this.isF = !this.isF
    }
  }
}
</script>

<style lang="scss">
.favorite{
  position: absolute;
  top: 18px;
  right: 18px;
  text-align: center;

  .icon{
    display: block;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 8px;

    &.not{
      color: #d4d6d9;
    }

    &.is{
      color: #f01414;
    }
  }
  .text{
    display: block;
    line-height: 10px;
    font-size: 10px;
    color: #4d555d;
  }
}

</style>
