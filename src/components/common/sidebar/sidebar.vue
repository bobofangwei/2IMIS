<template>
  <div class="sidebar">
    <el-menu default-active="$route.path" theme="dark" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in allRouters">
        <template v-if="!item.meta.hidden && item.meta.dropdown && item.children">
          <el-submenu :index="item.path">
            <template slot="title"><i :class="item.meta.icon"></i>{{item.meta.title}}</template>
            <el-menu-item v-for="childItem in item.children" v-if="!childItem.meta.hidden" :index="item.path.replace(/\/$/,'')+'/'+childItem.path">{{childItem.meta.title}}</el-menu-item>
          </el-submenu>
        </template>
        <template v-if="!item.meta.hidden && !item.meta.dropdown && item.children">
          <el-menu-item v-for="childItem in item.children" v-if="!childItem.meta.hidden" :index="item.path.replace(/\/$/,'')+'/'+childItem.path"><i :class="childItem.meta.icon"></i>{{childItem.meta.title}}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'allRouters'
    ])
  }
};

</script>
<style lang="scss" scope>
.sidebar {
  width: 100%;
  height: 100%;
}

</style>
