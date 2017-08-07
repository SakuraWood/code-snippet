<template lang="html">
  <header class="header-wrapper">
    {{msg}}
  </header>
</template>

<script>
export default {
  data () {
    return {
      msg: 'this is a header!'
    }
  }
}
</script>

<style lang="scss">
  .header-wrapper{
    width: 100%;
    height: 100px;
    background-color: #cccccc;
  }
</style>
