<template>
<div class="sidebar">
  <el-menu default-active="$route.path" background-color="#324057" text-color="#fff" class="el-menu-vertical-demo" unique-opened router>
    <template v-for="item in allRouters">
        <template v-if="!item.meta.hidden && item.meta.dropdown && item.children">
          <el-submenu :index="item.path">
            <template slot="title"><i class="iconfont" :class="item.meta.icon"></i>{{item.meta.title}}</template>
    <el-menu-item v-for="childItem in item.children" v-if="!childItem.meta.hidden" :index="item.path.replace(/\/$/,'')+'/'+childItem.path">{{childItem.meta.title}}</el-menu-item>
    </el-submenu>
    </template>
    <template v-if="!item.meta.hidden && !item.meta.dropdown && item.children">
          <el-menu-item v-for="childItem in item.children" v-if="!childItem.meta.hidden" :index="item.path.replace(/\/$/,'')+'/'+childItem.path"><i class="iconfont"  :class="childItem.meta.icon"></i>{{childItem.meta.title}}</el-menu-item>
        </template>
    </template>
  </el-menu>
</div>
</template>
<script type="text/javascript">
import {
  mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'allRouters'
    ])
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
    width: 100%;
    height: 100%;
    .iconfont {
        font-size: 18px;
        padding: 0 8px 0 0;
    }
}
</style>
