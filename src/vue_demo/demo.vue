<template>
  <div class="demo">
    <img :src="logo" alt="">
    <p>基于vue的模板演示</p>
  </div>
</template>

<script>
  import logo from './logo.png'

  export default {
    data() {
      return {
        logo
      }
    }
  }
</script>

<style lang="less">
  .demo {
    img {
      display: block;
      width: 150px;
      height: 150px;
      margin: 20px auto;
    }
    p {
      text-align: center;
      font-size: 23px;
      color: green;
    }
  }
</style>
