<template>
    <div id="thank-detail">
      <mt-field label="感谢内容" placeholder="请填写感谢内容" type="textarea" rows="20" v-model="content" :disabled=true>
      </mt-field>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          content: this.$route.query.content
        }
      }
    }
  </script>
<style lang="scss">
  #thank-detail {
    .mint-cell-text {
      font-size: 0.4rem;
    }
  }
</style>
