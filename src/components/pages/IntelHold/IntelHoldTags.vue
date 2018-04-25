<template lang="html">
<div class="tags">
  <el-menu
    class="el-menu-demo"
    @select="handleSelect"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened>
    <el-submenu v-for="item in tags" :key="item.id" :index="item.id">
      <template slot="title">{{item.label}}</template>
      <el-menu-item v-for="child in item.children" :index="child.id" :key="child.id">{{child.label}}</el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
import {
  tagsData as tags
} from './config/index.js';
export default {
  data() {
    return {
      tags: tags,
      defaultActiveIndex: ''
    };
  },
  methods: {
    handleSelect(index, indexPath) {
      let parentData = this.tags.filter(item => item.id === indexPath[0])[0];
      let selectData = parentData.children.filter(child => child.id === indexPath[1])[0];
      this.$emit('selectTag', selectData);
    },
    reset() {
      this.$children[0].activeIndex = '';
    }
  }
}
</script>

<style lang="scss">
html {
    height: 100%;
    body {
        height: 100%;
    }
}
.tags {}
</style>
