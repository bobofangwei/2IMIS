<template>
  <div class="personCenter">
    <breadbar></breadbar>
    <div class="basic-wrapper">
      <h2 class="section-title">基本信息</h2>
      <div class="content">
        <div class="photo-wrapper">
          <div class="photo-outter">
            <img src="./imgs/myphoto.jpg" class="photo" alt="">
          </div>
          <div class="btn-wrapper">
            <el-button type="primary">修改头像</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="password-wrapper">
      <h2 class="section-title">密码重置</h2>
    </div>
  </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
export default {
  components: {
    breadbar
  }
};

</script>
<style lang="scss" scope>
.personCenter {
  width: 90%;
  margin: 20px auto;
  .section-title {
    font-size: 20px;
    padding: 15px;
    background-color: #EFF2F7;
    color: #333;
    border-radius: 6px;
    margin: 15px 0;
  }
  .basic-wrapper {
    overflow: hidden;
    .photo-wrapper {
        float: left;
        margin: 15px 0; 
      .photo-outter {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        .photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .btn-wrapper {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}

</style>
