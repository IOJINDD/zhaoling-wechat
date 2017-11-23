<!-- 招领处搜索框 -->
<template>
    <div id="type-search2">
      <div layout="row" class="select">
        <div flex layout layout-align="center center" @click="openPop(index)" :class="{ 'item-check': itemNum == index }" v-for="item, index in textArray">
          {{ item }}
          <i class="material-icons icon" color="red" v-show="itemNum != index">arrow_drop_down</i>
          <i class="material-icons icon" color="red" v-show="itemNum == index">arrow_drop_up</i>
        </div>
      </div>

      <!-- 类型选择弹出框 -->
      <mu-popup position="top"
                popupClass="select-popup-top"
                :open="selectTypeOpen"
                @close="closePop">
        <mu-list>
          <mu-list-item :title="item.paraName"
                          :titleClass="{titleClass: showIndex0 === index}"
                          :toggleIconClass="{titleClass: showIndex0 === index}"
                          v-for="(item, index) of itemTypes"
                          key="item"
                          v-if="itemTypes.length > 0"
                          @click="chooseType(item, index)">
              <mu-icon slot="right" value="done" v-show="showIndex0 === index"/>
          </mu-list-item>
        </mu-list>
      </mu-popup>

      <!-- 地区选择弹出框 -->
      <mu-popup position="top"
                popupClass="select-popup-area-top"
                :open="selectAreaOpen"
                @close="closePop">
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
      import { areas } from 'tools/areas-city'
      // import { isEmpty } from 'tools/index'
      let _index
      export default {
        data () {
          return {
            province: [], // 省
            cities: [], // 市
            provinceItem: '',
            textArray: ['类别', '地址'], // 选择项初始信息
            itemNum: null, // 判断 箭头朝向
            selectAreaOpen: false, // 选择地区选择框是否显示
            selectTypeOpen: false, // 选择类型选择框是否显示
            showIndex0: null, // 类别选择图片显示序列号
            showIndex1: null, // 省选择图片显示序列号
            showIndex2: null // 市选择图片显示序列号
          }
        },
        methods: {
          // 打开选择
          openPop (index) {
            if (_index === index) {
              this.selectTypeOpen = false
              this.selectAreaOpen = false
              this.itemNum = null
              _index = null
            } else {
              _index = index
              this.itemNum = index
              switch (index) {
                case 0:
                  this.selectTypeOpen = true
                  this.selectAreaOpen = false
                  break
                case 1:
                  this.selectTypeOpen = false
                  this.selectAreaOpen = true
                  break
              }
            }
          },
          // 关闭弹出
          closePop () {
            this.selectTypeOpen = false
            this.selectAreaOpen = false
            this.itemNum = null
          },
          // 选择类型
          chooseType (item, val) {
            console.log(item)
            this.showIndex0 = val // 标记选中元素
            this.textArray.splice(0, 1, item.paraName) // 替换文字
            this.$emit('chooseType', item.parakey)
            this.closePop()
          },
          // 选择省
          choosePro (item, val) {
            console.log(item)
            this.cities = item.cities
            this.showIndex1 = val
            this.showIndex2 = null
            this.provinceItem = item.province
            this.$emit('choosePro', item.province)
          },
          // 选择市
          chooseCity (item, val) {
            console.log(item)
            this.showIndex2 = val
            this.textArray.splice(1, 1, item.city) // 替换文字
            this.$emit('chooseCity', item.city)
            this.closePop()
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
          }
        },
        watch: {

        },
        mounted () {
          this.province = areas
        }
      }
    </script>
    <style lang="scss">
      @import "../scss/index.scss";
      #type-search2 {
        z-index: 20151231;
        position: fixed;
        width: 100%;
        background: #fff;
        .select {
          text-align: center;
          color: #929292;
          padding: 10px 0;
          font-size: 0.32rem;
          border-bottom: 1px solid #ccc;
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
        margin-top: 89px;
        width: 100%;
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
