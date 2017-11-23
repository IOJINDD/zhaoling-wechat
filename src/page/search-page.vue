<template>
  <div id="search-page" :style="{height: screenHeight + 'px'}">
    <form class="search-top" action="" id="form">
      <input type="search" v-focus placeholder="搜索物品" id="search" v-model="keyword" style="width: 83%">
      <label for="" class="cancel"
              @click="cancel()">取消
      </label>
    </form>
    <div>
      <mu-list>
        <mu-sub-header>最近搜索</mu-sub-header>
        <mu-list-item title="Mike Li">
          <mu-icon value="search" slot="left"/>
        </mu-list-item>
        <mu-list-item title="Mike Li">
          <mu-icon value="search" slot="left"/>
        </mu-list-item>
        <mu-list-item title="清楚历史记录" style="text-align: center">
          <mu-icon value="delete" slot="right"/>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>
<script>
  import { isEmpty } from 'tools/index'
  export default {
    data () {
      return {
        keyword: '',
        screenHeight: window.screen.height,
        searchArray: [] // 搜索历史数组
      }
    },
    methods: {
      // 取消操作
      cancel () {
        this.$router.go(-1)
      }
    },
    mounted () {
       /* eslint-disable */

      // 获取搜索历史记录
      if (window.localStorage.getItem(this.localStorageType)) {
        this.searchArray = window.localStorage.getItem(this.localStorageType).split(',')
      }
      // 监听回车键
      document.addEventListener('keyup', (event) => {
        if (event.keyCode == '13') {
          if (this.searchArray.indexOf(this.keyword) < 0 && !isEmpty(this.keyword)) {
            this.searchArray.unshift(this.keyword)
          }
          window.localStorage.setItem('searchRecord', this.searchArray.join())

          // 返回列表页
          this.$router.push({
            name: 'losePick',
            query: {
              keyword: this.keyword
            }
          })
        }
      })
      // 阻止表单提交
      document.querySelector('#form').addEventListener('submit', function(e){
          e.preventDefault();
      },false)
    }
  }
</script>
<style lang="scss">
  @import "../scss/index.scss";
  #search-page {
    background-color: #fff;
    .search-top {
      background-color: $bgColor;
      padding: 0.23rem 0px;
      input {
        border-radius: 100px;
        border-style: none;
        outline: none;
        background: url(../assets/search.svg) no-repeat 0.3rem;
        background-color: #f3f3f3;
        background-size: 0.4rem;
        font-size: 0.4rem;
        padding: 0.15rem 0px;
        line-height: 0.4rem;
        padding-left: 0.9rem;
        margin-left: 0.2rem;
      }
      .cancel {
        width: 12%;
        font-size: 0.4rem;
        display: inline-block;
        text-align: center;
        color: #fff;
      }
    }
    .mu-item.show-left {
      padding-left: 50px;
    }
    .mu-circle-ripple, .mu-ripple-wrapper {
      margin: auto;
      margin-left: 3%;
      border-bottom: 1px solid #ccc;
      width: 94%;
    }
    .mu-item {
      padding: 0px;
      color: #9E9E9E;
      min-inline-size: 40px;
    }
    .mu-item-title {
      font-size: 0.35rem;
    }
  }
</style>
