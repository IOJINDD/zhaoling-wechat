<!-- 招领处列表详情 -->
<template>
  <div class="pickers-list-detail">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" :src="detail.headIcon ? detail.headIcon : defaultImg" alt="">
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{ detail.name }}</h4>
                <p class="weui-media-box__desc">{{ detail.city }} {{ detail.district }}</p>
                <p class="weui-media-box__desc">{{ detail.type }} | {{ detail.workTime || '暂无工作时间' }}</p>
                <a class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd weui-cell_primary">
                      认领：证件等<span style="color: #00bd9c">{{ detail.infoNum }}</span>条信息
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
        </a>
      </div>
  </div>
</template>
<script>
  import defaultImg from 'assets/logo.png'
  export default {
    data () {
      return {
        defaultImg
      }
    },
    props: {
      detail: {
        type: Object
      }
    }
  }
</script>
<style lang="scss">
  .pickers-list-detail {
    background-color: #fff;
    margin: 10px;
    .weui-media-box__desc {
      padding-top: 8px;
      font-size: 0.3rem;
      color: #756f6f;
    }
    .weui-media-box {
      padding: 10px;
      padding-top: 20px;
    }
    .weui-media-box__title {
      font-size: 0.4rem;
    }
    .weui-cell {
      padding: 0px;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #e5e5e5;
    }
    .weui-cell_access {
      color: #999;
    }
  }
</style>
