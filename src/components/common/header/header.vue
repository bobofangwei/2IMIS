<template>
  <div class="header-wrapper">
    <div class="logo">
      2I支撑维系平台
    </div>
    <div class="userinfo">
      <el-dropdown trigger="click" menu-align="start" @command="handlerCommand">
        <span class="el-dropdown-link">
                    <img class="photo-img" src="./imgs/myphoto.jpg" alt="">
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data: function() {
    return {};
  },
  methods: {
    handlerCommand: function(cmdDirect) {
      if (cmdDirect === 'logout') {
        this.$store.dispatch('logout').then(() => {
          location.reload(); // 为了重新实例化vue-router对象，避免bug
        });
      }
    }
  }
}

</script>
<style lang="scss" scope>
@import "../../../common/scss/colors.scss";
.header-wrapper {
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  .logo {
    margin-left: 60px;
    font-size: 28px;
    color: $dark-white;
    height: 80px;
    line-height: 80px;
    display: inline-block;
  }
  .userinfo {
    float: right;
    margin-right: 60px;
    .photo-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}

</style>
