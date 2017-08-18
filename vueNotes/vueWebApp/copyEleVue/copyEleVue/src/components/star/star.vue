<template lang="html">
  <div class="star" :class="`star-${size}`">
    <span class="star-item" :class="starItem" v-for="starItem in starClasses"></span>
  </div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  props: ['score', 'size'],
  computed: {
    starClasses () {
      let scoreFloor = Math.floor(this.score)
      let temp = []
      for (let index = 0; index < scoreFloor; index++) {
        temp.push(CLASS_ON)
      }

      if (this.score - scoreFloor >= 0.5) {
        temp.push(CLASS_HALF)
      }

      while (temp.length < 5) {
        temp.push(CLASS_OFF)
      }

      return temp
    }
  }
}
</script>

<style lang="scss">
  @import "./../../../static/_mixin.scss";
  .star-36{
    .star-item{
      display : inline-block;
      width : 15px;
      height : 15px;
      background-repeat: no-repeat;
      background-size: 15px 15px;
    }

    .on{
      @include bg-image(star36_on);
    }
    .half{
      @include bg-image(star36_half);
    }
    .off{
      @include bg-image(star36_off);
    }
  }

  .star-24{
    .star-item{
      display : inline-block;
      width : 10px;
      height : 10px;
      background-repeat: no-repeat;
      background-size: 10px 10px;
    }

    .on{
      @include bg-image(star24_on);
    }
    .half{
      @include bg-image(star24_half);
    }
    .off{
      @include bg-image(star24_off);
    }
  }

  .star-48{
    .star-item{
      display : inline-block;
      width : 20px;
      height : 20px;
      background-repeat: no-repeat;
      background-size: 120x 20px;
    }

    .on{
      @include bg-image(star48_on);
    }
    .half{
      @include bg-image(star48_half);
    }
    .off{
      @include bg-image(star48_off);
    }
  }
</style>
