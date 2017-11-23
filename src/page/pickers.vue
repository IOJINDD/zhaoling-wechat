<!-- tab招领处 -->
<template>
  <div id="pickers">
    <mu-appbar title="公司" class="appbar">
      <mu-icon-button icon="search" slot="right" @click.native="goSearchPage()"/>
    </mu-appbar>
    <div style="width: 100%;height: 45px;"></div>
    <typeSearch :itemTypes="itemTypes"
                ref="typeSearch"
                @chooseType="chooseType"
                @choosePro="choosePro"
                @chooseCity="chooseCity"></typeSearch>
    <div style="width: 100%;height: 40px;"></div>
    <detail v-tap="{methods: goDetail, id: item.id}" :detail="item" v-for="item,index in dataBody" key="index"></detail>
  </div>
</template>
<script>
  import typeSearch from 'components/type-search2'
  import detail from 'components/pickers-list-detail'
  import { getWindowHeight, getScrollTop, getScrollHeight } from 'tools/index'
  import { selectByType, listServiceStation } from 'services/service.js'

  // 获取招领处列表
  function getInfo (vue) {
    console.log(vue.searchData)
    listServiceStation.bind(vue)(vue.searchData, vue.infoData.pageNum, vue.infoData.pageSize).then(res => {
      if (vue.infoData.pageNum >= res.dataBody.totalPages) {
        vue.allLoaded = true
      }
      res.dataBody.data.forEach(function (element) {
        vue.dataBody.push(element)
      }, vue)
    })
  }

  export default {
    data () {
      return {
        infoData: {
          pageNum: 1,
          pageSize: 10
        },
        searchData: {
          loseOrPick: 'Pickers',
          keyword: '', // 模糊查询的字段
          filterType: '', // 筛选类别(参数类别)
          state: '', // 省
          city: '' // 市
        },
        itemTypes: [],
        allLoaded: false,
        dataBody: []
      }
    },
    methods: {
      // 跳转搜索页
      goSearchPage () {
        this.$refs.typeSearch.closePop()
        setTimeout(() => {
          this.$router.push({
            name: 'searchPage',
            query: {
              keyword: this.$route.query.keyword
            }
          })
        }, 200)
      },
      // 获取类型
      chooseType (val) {
        this.searchData.filterType = val
        this.dataBody = []
        this.infoData.pageNum = 1
        getInfo(this)
      },
      // 获取省
      choosePro (val) {
        if (val === '不限') {
          this.searchData.state = ''
        } else {
          this.searchData.state = val
        }
      },
      // 获取市
      chooseCity (val) {
        if (val === '不限') {
          this.searchData.city = ''
        } else {
          this.searchData.city = val
        }
        this.dataBody = []
        this.infoData.pageNum = 1
        getInfo(this)
      },
      // 去招领处详情页
      goDetail (param) {
        this.$router.push({
          name: 'pickerDetail',
          params: {
            id: param.id
          }
        })
      }
    },
    components: {
      typeSearch,
      detail
    },
    created () {
      // 获取类别
      selectByType.bind(this)({
        parameType: 'SERVERTYPE'
      }).then(res => {
        this.itemTypes = res.dataBody
        this.itemTypes.unshift({
          paraName: '不限',
          parakey: ''
        })
      })
      // 获取数据
      getInfo(this)
    },
    mounted () {
      window.onscroll = () => {
        if (document.getElementById('pickers')) {
          console.log('pickers')
          console.log('getWindowHeight', getWindowHeight())
          console.log('getScrollTop', getScrollTop())
          console.log('getScrollHeight', getScrollHeight())
          if (getWindowHeight() + getScrollTop() + 80 > getScrollHeight()) {
            this.infoData.pageNum++
            getInfo(this)
          }
        }
      }
    },
    activated () {
      // 获取当前搜索的内容
      if (this.$route.query.keyword) {
        this.title = this.$route.query.keyword
        this.searchData.keyword = this.$route.query.keyword
        getInfo(this)
      }
    }
  }
</script>
<style lang="scss">
  #pickers {
    .appbar {
      text-align: center;
      .mu-appbar-title {
        font-size: 0.4rem;
      }
    }
  }
</style>
