<template>
  <div id="picker-detail">
    <openPhoto :imgPaths="dataDetail.paths" v-if="dataDetail.paths"></openPhoto>
    <div class="weui-panel__bd">
      <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="dataDetail.headIcon ? dataDetail.headIcon : defaultImg" alt="">
        </div>
        <div class="weui-media-box__bd">
          <mu-flexbox>
            <mu-flexbox-item grow="8">
              <h4 class="weui-media-box__title">{{ dataDetail.name }}</h4>
            </mu-flexbox-item>
            <mu-flexbox-item grow="3" class="text-right">
                <mu-chip class="demo-chip">
                  <mu-avatar :size="20" :src="mail"/>感谢信
                </mu-chip>
              <!-- <mu-badge :content="String(dataDetail.thanksNum)" class="demo-icon-badge" circle color="#35c590" slot="action" v-tap="{methods: goThankList}">
                <mu-icon value="mail_outline"/>
              </mu-badge> -->
            </mu-flexbox-item>
          </mu-flexbox>
          <p class="weui-media-box__desc">{{ dataDetail.city }} {{ dataDetail.district }}</p>
          <p class="weui-media-box__desc">{{ dataDetail.type }} | {{ dataDetail.workTime || '暂无工作时间' }}</p>
        </div>
      </a>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="公司概况"/>
      <mu-tab value="tab2" :title="'认领物品(' + totalCount + ')'"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <article class="weui-article">
          <section>
              <h2 class="title">公司介绍</h2>
              <section>
                  <p>
                    {{ dataDetail.introduction }}
                  </p>
              </section>
          </section>
      </article>
      <article class="weui-article">
          <section>
            <!-- <h2 class="title">公司详情</h2> -->
            <section>
                <h3>电话</h3>
                <p>{{ dataDetail.phone || '暂无联系方式' }}</p>
                <h3>工作时间</h3>
                <p>{{ dataDetail.workTime || '暂无工作时间'}}</p>
                <h3>详细地址</h3>
                <p>{{ dataDetail.address || '暂无详细地址' }}</p>
            </section>
          </section>
      </article>
    </div>
    <div v-if="activeTab === 'tab2'">
      <detail v-tap="{methods: goDetail, id: item.id}" :detail="item" v-for="item,index in dataBody" key="index" loseOrpick="pick">

      </detail>
    </div>
  </div>
</template>
<script>
  import openPhoto from 'components/open-photo'
  import defaultImg from 'assets/logo.png'
  import detail from 'components/lose-pick-list-detail'
  import mail from 'assets/mail_outline.svg'
  import { getWindowHeight, getScrollTop, getScrollHeight } from 'tools/index'
  import { showServiceStationDetail, listLosePickInfo } from 'services/service'

  function getInfo (vue) {
    listLosePickInfo.bind(vue)(vue.searchData, vue.infoData.pageNum, vue.infoData.pageSize).then(res => {
      if (vue.infoData.pageNum >= res.dataBody.totalPages) {
        vue.allLoaded = true
      }
      res.dataBody.data.forEach(function (element) {
        vue.dataBody.push(element)
      }, vue)
      vue.totalCount = res.dataBody.totalCount
      console.log(vue.totalCount)
    })
  }
  export default {
    data () {
      return {
        defaultImg,
        activeTab: 'tab1',
        mail,
        dataDetail: {},
        dataBody: [], // 信息数组
        infoData: { // 查询的页码
          pageNum: 1,
          pageSize: 10
        },
        searchData: {
          serviceStation: '',
          keyword: '', // 模糊查询的字段
          parameType: '' // 筛选类别(参数类别)
        },
        totalCount: 0 // 招领处信息的数量
      }
    },
    methods: {
      // 感谢信
      goThankList () {

      },
      // 查看信息详情
      goDetail () {

      },
      // 切换tab
      handleTabChange (val) {
        this.activeTab = val
      }
    },
    activated () {

    },
    created () {

    },
    mounted () {
      // 监听滚轮
      window.onscroll = () => {
        if (document.querySelector('.mu-tabs') && this.activeTab === 'tab2') {
          if (getScrollTop() >= 300) {
            document.querySelector('.mu-tabs').className = 'fixed mu-tabs'
          } else {
            document.querySelector('.mu-tabs').className = 'mu-tabs'
          }
          if (getWindowHeight() + getScrollTop() + 80 > getScrollHeight()) {
            this.infoData.pageNum++
            getInfo(this)
          }
        }
      }
    },
    components: {
      openPhoto,
      detail
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        // 设置初始参数
        vm.searchData.serviceStation = to.params.id
        vm.activeTab = 'tab1'
        // 获取招领处的信息详情
        showServiceStationDetail.bind(vm)(to.params.id).then(res => {
          vm.dataDetail = res.dataBody
        })

        // 获取招领信息
        getInfo(vm)
        // 返回顶部
        console.log('scrollTo')
        window.scrollTo(0, 0)
      })
    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  #picker-detail {
    .weui-panel__bd {
      background-color: #fff;
    }
    .weui-media-box__title {
      font-size: 0.35rem;
    }
    .weui-media-box__desc {
      font-size: 0.3rem;
      line-height: 0.6rem;
    }
    .mu-badge-circle {
      width: 18px;
      height: 18px;
    }
    .material-icons {
      font-size: 0.5rem;
      color: $textColor;
    }
    .mu-chip {
      border: 1px solid #35c590;
      line-height: 24px;
      padding: 0px 4px;
      background-color: #fff;
      color: #35c590;
      border-radius: 4px;
    }
    .mu-avatar {
      background-color: #fff;
    }
    .mu-chip .mu-avatar:first-child {
      margin-left: 0px;
    }
    .mu-avatar img {
      width: 80%;
      height: 80%;
    }
    article {
      background-color: #fff;
      margin: 10px;
      p {
        font-size: 0.35rem;
        line-height: 0.47rem;
        color: #888;
        font-weight: 300;
      }
    }
    .weui-article section {
      margin-bottom: .5em;
    }
    .mu-tabs {
      background-color: #fff;
      border-top: 1px solid #ccc;
    }
    .mu-tab-text {
      color: rgba(0,0,0,.87)
    }
    .mu-tab-link-highlight {
      background-color: #35c590;
    }
    .lose-pick-list-detail {
      padding-bottom: 12px;
    }
    .fixed {
      position: fixed;
      top: 0px;
    }
  }
</style>
