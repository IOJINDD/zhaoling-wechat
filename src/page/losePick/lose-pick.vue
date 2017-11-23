<!-- tab失物招领 -->
<template>
  <div id="losePick">
    <mu-appbar :title="title" class="appbar">
      <mu-icon-button icon="add" slot="right" @click.native="aaa()"/>
      <mu-icon-button icon="search" slot="right" @click.native="goSearchPage()"/>
    </mu-appbar>
    <div style="width: 100%;height: 45px;"></div>
    <div>
      <typeSearch :itemTypes="itemTypes"
                  ref="typeSearch"
                  @chooseLoPi="chooseLoPi"
                  @chooseType="chooseType"
                  @choosePro="choosePro"
                  @chooseCity="chooseCity"></typeSearch>
      <div style="width: 100%;height: 40px;"></div>
      <detail v-tap="{methods: goDetail, id: item.id, loseOrPick: item.loseOrPick}" :detail="item" v-for="item,index in dataBody" key="index">
        <div slot="address">
          <mu-list-item :title="item.city + item.district + item.address">
            <mu-icon slot="left" value="room"/>
          </mu-list-item>
        </div>
      </detail>
    </div>
  </div>
</template>
<script>
  import typeSearch from 'components/type-search'
  import detail from 'components/lose-pick-list-detail'
  import { getWindowHeight, getScrollTop, getScrollHeight } from 'tools/index'
  import { selectByType, listLosePickInfo } from 'services/service.js'

  function getInfo (vue) {
    console.log(vue.searchData)
    listLosePickInfo.bind(vue)(vue.searchData, vue.infoData.pageNum, vue.infoData.pageSize).then(res => {
      if (vue.infoData.pageNum > res.dataBody.totalPages || vue.infoData.pageNum === res.dataBody.totalPages) {
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
        title: '',
        dataBody: [], // 数据
        infoData: {
          pageNum: 1,
          pageSize: 10
        },
        searchData: {
          loseOrPick: 'lose',
          keyword: '', // 模糊查询的字段
          parameType: '', // 筛选类别(参数类别)
          state: '', // 省
          city: '' // 市
        },
        itemTypes: [] // 搜索框类型数组
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
      // 跳转详情
      goDetail (param) {
        if (param.loseOrPick === '招领') {
          this.$router.push({
            name: 'pickDetail',
            params: {
              id: param.id
            }
          })
        } else {
          this.$router.push({
            name: 'loseDetail',
            params: {
              id: param.id
            }
          })
        }
      },
      // 获取种类
      chooseLoPi (val) {
        this.searchData.loseOrPick = val
        this.dataBody = []
        this.infoData.pageNum = 1
        getInfo(this)
      },
      // 获取类型
      chooseType (val) {
        console.log(val)
        this.searchData.parameType = val
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
      }
    },
    components: {
      typeSearch,
      detail
    },
    mounted () {
      // 监听滚轮
      window.onscroll = () => {
        console.log(document.getElementById('losePick'))
        if (document.getElementById('losePick')) {
          console.log('losePick')
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
    created () {
      // 获取类别
      selectByType.bind(this)({
        parameType: 'ITEMTYPE'
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
    activated () {
      console.log(this.$route.query)
      if (this.$route.query.keyword) {
        this.title = this.$route.query.keyword
        this.searchData.keyword = this.$route.query.keyword
        getInfo(this)
      }
    }
  }
</script>
<style lang="scss">
  #losePick {

  }
</style>
