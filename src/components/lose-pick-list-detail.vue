<!-- 失物招领列表 -->
<template>
  <div class="lose-pick-list-detail">
    <mu-flexbox class="title_border">
      <mu-flexbox-item class="title" grow="8">
        {{ detail.title }}
      </mu-flexbox-item>
      <mu-flexbox-item class="reward" grow="2">
        <span class="span" v-if="detail.awardBonus > 0">￥ {{ detail.awardBonus / 100 }}</span>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox justify="space-between">
      <mu-flexbox-item class="time">
        <span v-if="loseOrpick === 'lose'">丢失时间：</span>
        <span v-if="loseOrpick === 'pick'">拾取时间：</span>
        {{ detail.pickLoseTime | date }}
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox justify="space-between">
      <mu-flexbox-item>
        <slot name="address">

        </slot>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    filters: {
      date (input) {
        if (input % 3600000 === 0) {
          return new Date(input).format('yyyy年MM月dd日')
        } else {
          return new Date(input).format('yyyy年MM月dd日 hh:mm')
        }
      }
    },
    props: {
      detail: {
        type: Object
      },
      loseOrpick: {
        type: String,
        default () {
          return 'lose'
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  .lose-pick-list-detail {
    padding: 2px 15px;
    margin: 10px 10px;
    background-color: #fff;
    .material-icons {
      color: #3dab80;
    }
    .title_border {
      margin: 15px 0px;
    }
    .reward {
      text-align: right;
      span {
        padding: 6px;
        background-color: rgba(230, 55, 55, 0.75);
        color: #fff;
        border-radius: 10px;
      }
    }
    .title {
      font-size: 0.4rem;
      color: #414a60;
      line-height: 0.6rem;
    }
    .time {
      font-size: 0.34rem;
      color: #9fa3b0;
    }
    .mu-item-left {
      left: 0px
    }
    .mu-item.show-left {
      padding-left: 14px;
    }
    .mu-item {
      min-height: 30px;
      padding: 10px
    }
    .mu-item-title {
      font-size: 0.32rem;
      color: #3dab80;
      font-weight: 200;
    }
    .material-icons {
      font-size: 0.32rem;
    }
  }
</style>
