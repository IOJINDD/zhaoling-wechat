<template>
    <div id="thank-note-list">
      <mu-list
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        v-if="dataBody.data.length > 0">
        <!--<mu-sub-header>今天</mu-sub-header>-->
        <mu-list-item :title="new Date(data.createTime).format('yyyy年MM月dd日 hh点mm分')"
                      v-for="data, index in dataBody.data" key="item"
                      @click.click="goDetail(data.content)">
          <mu-avatar :src="head" slot="leftAvatar"/>
          <span slot="describe">
            {{ data.content }}
          </span>
        </mu-list-item>
        <mu-divider inset/>
      </mu-list>
      <div v-if="isShow && dataBody.data.length == 0" class="no-data" :style="{height: screenHeight + 'px'}">
        <img :src="defaultImg" alt="" width="100%">
        <span class="span">该招领处还未收到感谢信~</span>
      </div>
    </div>
  </template>
  <script>
    import { listThanksEmail } from 'services/service.js'
    import head from 'assets/head.jpg'
    import defaultImg from 'assets/defaultImg.jpg'
    function getInfo (vm) {
      vm.loading = true
      listThanksEmail.bind(vm)(vm.infoData.pageNum, vm.infoData.pageSize, vm.id).then(res => {
        if (res.code === '200') {
          if (vm.infoData.pageNum >= res.dataBody.totalPages) {
            vm.loading = true
          } else {
            vm.loading = false
            vm.infoData.pageNum++
          }
          res.dataBody.data.forEach(function (element) {
            vm.dataBody.data.push(element)
          }, vm)

          // 判断是否有数据
          if (res.dataBody.data.length === 0) {
            vm.isShow = true
          }
        } else {
          vm.isShow = true
        }
      })
    }
    export default {
      data () {
        return {
          dataBody: {
            data: []
          },
          infoData: {
            pageNum: 1,
            pageSize: 10
          },
          loading: false,
          isShow: false,
          head, // 默认头像
          defaultImg, // 默认图片
          id: this.$route.params.id, // 招领处id
          screenHeight: window.screen.height
        }
      },
      methods: {

        // 加载数据
        loadMore () {
          getInfo(this)
        },

        // 查看详情
        goDetail (val) {
          this.$router.push({
            name: 'thankDetail',
            query: {
              content: val
            }
          })
        }
      },
      filters: {
        date (input) {
          return new Date(input).format('yyyy年MM月dd日 hh点mm分')
        }
      },
      mounted () {
        getInfo(this)
      }
    }
  </script>
  <style lang="scss">
    #thank-note-list {
      background-color: #fff;
      .mu-item-title {
        font-size: 0.4rem;
      }
      .no-data {
        background-color: #a6d2bb;
        width: 100%;
        height: 100%;
        text-align: center
      }
      .span {
        font-size: 0.5rem;
        color: #fff;
      }
    }
  </style>
