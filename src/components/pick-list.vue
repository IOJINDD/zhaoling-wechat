<!-- 招领列表信息组件 -->
<template>
  <div id="pick-list" :style="{minHeight: screenHeight - 200 + 'px'}">
    <!--招领-->
    <div>
      <div class="com_divide"></div>
      <div v-for="item, index in dataBody" v-if="dataBody">
        <listDetail v-tap="{methods: goDetail, type: 'pick', id: item.id}">
          <span slot="title" class="com_list_title">{{ item.title }}</span>
          <span slot="time" class="com_list_time">拾取时间：{{ item.pickLoseTime | date }}</span>
          <p slot="content" class="com_list_content">
            {{ item.content }}
          </p>
          <span slot="address" class="address">
            <mu-list-item :title="item.city + item.district + item.address">
              <mu-icon slot="left" value="room"/>
            </mu-list-item>
          </span>
          <span slot="type" class="com_labelStyle">
            <mu-icon value="class" :size='12'/>
            {{ item.type }}
          </span>
        </listDetail>
        <div class="com_divide"></div>
      </div>
    </div>
    <div v-if="dataBody.length == '0'">
      <mt-cell :title="propTitle" class="com_cell">
        <mu-icon value="info_outline" />
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import listDetail from './list-detail.vue'
  // import { getScrollTop } from 'tools/index.js'
  export default {
    data () {
      return {
        propTitle: '搜索中...',
        screenHeight: window.screen.height
      }
    },
    props: {
      dataBody: { // 招领信息数据
        type: Array,
        default: {
          retuen: []
        }
      },
      pickerDetail: {
        type: Object
      }
    },
    methods: {
      goDetail (param) {
        this.$router.push({
          name: 'pickDetail',
          params: {
            id: param.id
          },
          query: {
            name: this.pickerDetail.name,
            phone: this.pickerDetail.phone
          }
        })
      }
    },
    filters: {
      date (input) {
        return new Date(input).format('yyyy年MM月dd日')
      }
    },
    mounted () {
      this.propTitle = '搜索中...'
      setTimeout(() => {
        this.propTitle = '暂时没找到相关信息'
        console.log(this.dataBody)
      }, 400)
    },
    components: {
      listDetail
    }
  }
</script>
<style lang="scss">
  @import "../scss/index.scss";
  #pick-list {
    .address {
      .mu-item-title {
        font-size: 0.3rem;
        color: $textColor;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .mu-item.show-left {
        padding-left: 24px;
      }
      .mu-item-left {
        left: 5px;
      }
      .mu-item {
        padding: 0;
      }
    }
  }
</style>
