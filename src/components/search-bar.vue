<template>
  <div id="search-bar">
    <form class="search-top" onsubmit="return false">
      <input type="search" placeholder="搜索物品" id="search"
              :style="{width: inputWidth}"
              @click="touchSearch()"
              v-model="keyword">
      <label for="" class="cancel"
              v-if="isShow"
              @click="cancel()">取消
      </label>
    </form>
    <div layout="row" class="select" v-if="!isShow">
      <div flex layout layout-align="center center" @click="openPop(index)" :class="{ 'item-check': itemNum == index }" v-for="item, index in textArray">
        {{ item }}
        <i class="material-icons icon" color="red" v-show="itemNum != index">arrow_drop_down</i>
        <i class="material-icons icon" color="red" v-show="itemNum == index">arrow_drop_up</i>
      </div>
    </div>

    <!-- 类型选择弹出框 -->
    <mu-popup position="top"
              popupClass="select-popup-top"
              :open="typeSelectOpen"
              @close="closePop">
      <mu-list>
        <mu-list-item :title="item.paraName"
                      :titleClass="{titleClass: showIndex === index}"
                      :toggleIconClass="{titleClass: showIndex === index}"
                      v-for="(item, index) of itemTypes"
                      key="item"
                      @click="chooseItem(item, index)">
          <mu-icon slot="right" value="done" v-show="showIndex === index"/>
        </mu-list-item>
      </mu-list>
    </mu-popup>

    <!-- 地区选择弹出框 -->
    <mu-popup position="top"
              popupClass="select-popup-area-top"
              :open="selectAreaOpen"
              @close="closeAreaPop">
      <layout justify="flex-between" align="flex-start">
        <flex class="border-right">
          <mu-list>
            <mu-list-item :title="item.province"
                          :titleClass="{titleClass: showIndex1 === index}"
                          :toggleIconClass="{titleClass: showIndex1 === index}"
                          v-for="(item, index) of province"
                          key="item"
                          @click="choosePro(item, index)">
              <mu-icon slot="right" value="done" v-show="showIndex1 === index"/>
            </mu-list-item>
          </mu-list>
        </flex>
        <flex class="border-right">
          <mu-list>
            <mu-list-item :title="item.city"
                          :titleClass="{titleClass: showIndex2 === index}"
                          :toggleIconClass="{titleClass: showIndex2 === index}"
                          v-for="(item, index) of cities"
                          key="item"
                          @click="chooseCity(item, index)">
              <mu-icon slot="right" value="done" v-show="showIndex2 === index"/>
            </mu-list-item>
          </mu-list>
        </flex>
      </layout>
    </mu-popup>
  </div>
</template>
<script>
  // import { selectByType } from 'services/service.js'
  import { areas } from 'tools/areas-city'
  import { isEmpty } from 'tools/index'
  let _index
  export default {
    data () {
      return {
        inputWidth: '95%',
        keyword: '',
        searchArray: [], // 搜索历史数组
        isShow: false, // 搜索页是否显示
        province: [], // 省
        cities: [], // 市
        searchParams: { // 返回上级的参数
          flag: null,
          keyword: null,
          parameType: '',
          city: '',
          state: ''
        },
        textArray: ['类别', '地址'], // 选择项初始信息
        itemNum: null, // 判断 箭头朝向
        selectAreaOpen: false, // 选择地区选择框是否显示
        typeSelectOpen: false, // 选择类型选择框是否显示
        showIndex: null, // 类别选择图片显示序列号
        showIndex1: null, // 类别选择图片显示序列号
        showIndex2: null // 类别选择图片显示序列号
      }
    },
    methods: {

      // 点击搜索框
      touchSearch () {
        if (this.keyword) {

        } else {
          this.inputWidth = '85%' // 设置搜索框的宽度
          this.isShow = true // 显示搜索页
          this.$emit('isSearch', true)
        }
      },

      // 取消搜索
      cancel () {
        this.isShow = false
        this.inputWidth = '95%'
        this.$emit('isSearch', false)
      },

      // 打开选择框
      openPop (index) {
        if (_index === index) { // 判断当前点击的是否是同一个
          this.typeSelectOpen = false
          this.selectAreaOpen = false
          this.itemNum = null
          _index = null
        } else {
          _index = index
          this.itemNum = index
          // 判断选择框是类别 还是 地址
          if (index === 0) {
            this.selectAreaOpen = false
            this.typeSelectOpen = true
          } else {
            this.typeSelectOpen = false
            this.selectAreaOpen = true
          }
        }
      },

      // 选择省
      choosePro (item, index) {
        this.cities = item.cities
        this.showIndex1 = index
        this.showIndex2 = null
        this.provinceItem = item.province
      },

      // 选择市
      chooseCity (item, index) {
        this.showIndex2 = index
        this.searchParams.city = item.city // 市
        this.searchParams.state = this.provinceItem // 省
        this.selectAreaOpen = false // 关闭弹出
        this.textArray.splice(1, 2, item.city) // 替换文字
        this.itemNum = null
        this.$emit('searchFun', this.searchParams)
      },

      // 选择类别
      chooseItem (item, index) {
        this.showIndex = index
        this.textArray.splice(0, 1, item.paraName) // 替换文字
        this.typeSelectOpen = false
        this.itemNum = null
        _index = null
        this.searchParams.parameType = item.parakey
        this.$emit('searchFun', this.searchParams)
      },

      // 关闭类型选择框
      closePop () {
        this.typeSelectOpen = false
        this.itemNum = null
      },

      // 关闭地址选择框
      closeAreaPop () {
        this.selectAreaOpen = false
        this.itemNum = null
      },

      // 初始化
      init () {
        this.itemNum = null
        this.inputWidth = '95%'
        this.isShow = false
        this.refreshParams()
        this.$emit('searchFun', this.searchParams)
      },

      // 搜索方法
      search (msg) {
        if (msg) { // 切换样式
          this.keyword = msg
          this.searchParams.keyword = msg
          this.init()
        } else {
          this.$emit('searchFun', this.searchParams)
        }
      },

      // 刷新搜索数据
      refreshParams () {
        this.searchParams.flag = this.isShow
        this.searchParams.keyword = this.keyword
        if (this.textArray.length === 1) {
          this.textArray.splice(0, 1, '类别') // 替换文字
          this.searchParams.parameType = '' // 类别
          this.showIndex = null
        } else {
          this.textArray.splice(1, 2, '地址') // 替换文字
          this.searchParams.parameType = '' // 类别
          this.searchParams.city = '' // 市
          this.searchParams.state = '' // 省
          this.showIndex = null
          this.showIndex1 = null
          this.showIndex2 = null
        }
      },

      // 清空历史搜索记录
      clearHis () {
        this.searchArray = []
      }
    },
    props: {
      itemTypes: {
        type: Array
      },

      // 地址搜索是否展示
      areaIsShow: {
        type: Boolean,
        default () {
          return true
        }
      },

      // 类型搜索是否显示
      typeIsShow: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    watch: {

      // 监听是否有搜索词
      keyword: function (val) {
        if (isEmpty(val)) {
          this.inputWidth = '85%' // 设置搜索框的宽度
          this.isShow = true // 显示搜索页
        }
      }
    },
    mounted () {
      this.province = areas
      if (!this.areaIsShow) {
        this.textArray = ['类别']
      }
      // 获取搜索历史记录
      if (window.localStorage.getItem(this.localStorageType)) {
        this.searchArray = window.localStorage.getItem(this.localStorageType).split(',')
      }
       /* eslint-disable */
      document.addEventListener('keyup', (event) => {
        if (event.keyCode == '13') {
          document.getElementById('search').blur()
          if (this.searchArray.indexOf(this.keyword) < 0 && !isEmpty(this.keyword)) {
            this.searchArray.unshift(this.keyword)
          }
          window.localStorage.setItem(this.localStorageType, this.searchArray.join())
          this.init()
        }
      })
    }
  }
</script>
<style lang="scss">
  @import "../scss/index.scss";
  #search-bar {
    z-index: 20151231;
    position: fixed;
    width: 100%;
    background: #fff;
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
        width: 10%;
        font-size: 0.4rem;
        display: inline-block;
        text-align: center;
        color: #fff;
      }
    }
    .select {
      text-align: center;
      color: #929292;
      padding: 5px 0;
      border-bottom: 1px solid #ccc
    }
    .item-check {
      color: $textColor;
      .icon {
        color: $textColor;
      }
    }
  }
  .select-popup-area-top {
    margin-top: 70px;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
    .border-right {
      border-right: 1px solid #ccc;
      font-size: 1.1rem;
      max-height: 400px;
      overflow: scroll;
      width: 50%;
    }
    .titleClass {
      color: $textColor;
    }
    .material-icons {
      color: $textColor;
    }
  }

  .select-popup-top {
    margin-top: 70px;
    left: 25%;
    width: 50%;
    min-height: 200px;
    max-height: 400px;
    .titleClass {
      color: $textColor;
    }
    .material-icons {
      color: $textColor;
    }
    .mu-list {
      max-height: 400px;
      padding: 8px 0;
      width: 100%;
      position: relative;
      overflow-x: hidden;
      overflow-y: visible;
    }
  }
</style>
