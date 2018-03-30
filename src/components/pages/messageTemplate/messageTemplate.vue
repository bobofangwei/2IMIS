<template lang="html">
  <div class="message-template">
    <breadbar></breadbar>
    <ul class="card-list">
      <li class="card-item">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont icon-businesscard"></i></div>
            <div class="text-wrapper">
              <p class="title">百度圣卡</p>
              <p class="desc">百度超圣卡、大圣卡、小圣卡</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link to=""><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>
              </ul>
            </div>
          </div>
      </li>
      <li class="card-item">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont icon-businesscard"></i></div>
            <div class="text-wrapper">
              <p class="title">百度圣卡</p>
              <p class="desc">百度超圣卡、大圣卡、小圣卡</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link to=""><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>
              </ul>
            </div>
          </div>
      </li><li class="card-item">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont icon-businesscard"></i></div>
            <div class="text-wrapper">
              <p class="title">百度圣卡</p>
              <p class="desc">百度超圣卡、大圣卡、小圣卡</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link to=""><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>
              </ul>
            </div>
          </div>
      </li><li class="card-item">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont icon-businesscard"></i></div>
            <div class="text-wrapper">
              <p class="title">百度圣卡</p>
              <p class="desc">百度超圣卡、大圣卡、小圣卡</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link to=""><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>
              </ul>
            </div>
          </div>
      </li><li class="card-item">
          <div class="card">
            <div class="left-right">
            <div class="icon-wrapper"><i class="iconfont icon-businesscard"></i></div>
            <div class="text-wrapper">
              <p class="title">百度圣卡</p>
              <p class="desc">百度超圣卡、大圣卡、小圣卡</p>
            </div>
            </div>
            <div class="operate">
              <ul class="operate-list">
                <li class="operate-item"><router-link to=""><i class="iconfont icon-enclosure"></i>查看  </router-link></li>
                <li class="operate-item"><router-link to=""><i class="iconfont icon-edit"></i>修改</router-link></li>
              </ul>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
import breadbar from '@/components/common/breadbar/breadbar.vue';
export default {
  components: {
    breadbar
  }
};
</script>
<style lang="scss" scoped>
.message-template {
    .card-list {
        margin: 15px;
        overflow: hidden;
    }
    .card-item {
        display: inline-block;
        float: left;
        margin: 25px;
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
                        border-right: 1px solid #DCDFE6;
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
