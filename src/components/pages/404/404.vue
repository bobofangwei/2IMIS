<template>
  <div class="404">
    <div class="wrapper">
      <div>
        <img class="error-img" src="./404.jpg">
      </div>
      <router-link to="/" class="link">返回首页</router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
  margin-top: 230px;
  .link {
    display: inline-block;
    margin-top: 30px;  
    font-size: 28px;  
  }
  .error-img {
    width: 50%;
  }
}
</style>
