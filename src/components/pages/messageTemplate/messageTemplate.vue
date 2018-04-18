<template lang="html">
  <div class="message-template">
    <breadbar></breadbar>
    <ul class="card-list">
      <li class="card-item" v-for="product in productList">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont" :class="iconClass(product.icon)" :style="iconStyle(product.color)"></i></div>
            <div class="text-wrapper">
              <p class="title">{{product.title}}</p>
              <p class="desc">{{product.products}}</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link :to="link(product.id)"><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <!--<li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>-->
              </ul>
            </div>
          </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import breadbar from '@/components/common/breadbar/breadbar.vue';
import {
  getProductList
} from '@/api/messageDetail.js';
export default {
  data() {
    return {
      productList: []
    }
  },
  components: {
    breadbar
  },
  created() {
    getProductList().then(res => {
      this.productList = res;
      console.log('res', res);
    });
  },
  methods: {
    iconClass(iconName) {
      return 'icon-' + iconName;
    },
    iconStyle(color) {
      return 'color:' + color;
    },
    link(id) {
      return '/message/messageTemp/' + id;
    }
  }
};
</script>
<style lang="scss" scoped>
.message-template {
    width: 95%;
    margin: 15px auto;
    .card-list {
        overflow: hidden;
        /*消除最右侧的margin*/
        margin-right: -45px;
    }
    .card-item {
        display: inline-block;
        float: left;
        margin: 25px 45px 25px 0;
        width: 330px;
        height: 150px;
        .card {
            border: 1px solid #d1dbe5;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
            .left-right {
                display: flex;
                flex: row;
                padding: 20px;
                align-items: center;
                .icon-wrapper {
                    display: inline-block;
                    margin-right: 20px;
                    .iconfont {
                        font-size: 68px;
                        color: blue;
                    }
                }
                .text-wrapper {
                    flex: 1;
                    .title {
                        font-size: 24px;
                        color: #303133;
                    }
                    .desc {
                        margin-top: 16px;
                        font-size: 14px;
                        color: #909399;
                    }
                }
            }
            .operate {
                background-color: #F2F6FC;
                padding: 6px 0;
                .operate-list {
                    overflow: hidden;
                    .operate-item {
                        float: left;
                        padding: 5px 10px;
                        a {
                            color: #606266;
                        }
                        .iconfont {
                            font-size: 14px;
                            margin-right: 5px;
                        }
                    }

                }
            }
        }
    }
}
</style>
