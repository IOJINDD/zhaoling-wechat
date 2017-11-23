<template>

</template>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      goBack () {
        this.$emit('goBack', '')
      }
    }
  }
</script>
<style lang="scss">
  #modify-password {
    .appbar {
      text-align: center;
    }
  }
</style>