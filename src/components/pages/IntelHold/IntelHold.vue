<template lang="html">
<div class="intel-model">
  <img src="./logo.png" alt="logo" class="movelogo" ref="logoImg" :style="logoStyle">
  <div class="condition-wrapper">
    <intel-hold-strategy :selectedTag="selectedTag" @cancelSelectedTag="cancelSelectedTag"></intel-hold-strategy>
  </div>
  <div class="tags-wrapper">
    <!--
    <el-tree :data="tags" :props="tagProps" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
      <div class="custom-tree-node" slot-scope="{ node, data }" :class="{selected:data.selected}">
        <span>{{data.label}}</span>
      </div>
    </el-tree>
  -->
  <intel-hold-tags @selectTag="selectTag" ref="tagNav"></intel-hold-tags>
  </div>
  <el-button type="primary" class="saveBtn">保存</el-button>
</div>
</template>

<script>
import {
  isEmptyObject
} from '@/util/index.js';
import tags from './config/index.js';
import IntelHoldStrategy from './IntelHoldStrategy.vue';
import IntelHoldTags from './IntelHoldTags.vue';
export default {
  name: 'IntelHold',
  components: {
    IntelHoldStrategy,
    IntelHoldTags
  },
  data() {
    return {
      selectedTag: null // 当前选中的标签
    }
  },
  computed: {
    logoStyle() {
      let displayValue = this.selectedTag ? '' : 'none';
      return {
        display: displayValue
      };
    }
  },
  mounted() {
    document.body.addEventListener('mousemove', this.handleMouseMove);
    // document.body.addEventListener('mousedown', this.handleMouseDown);
  },
  methods: {
    // 这里有待改进的地方，如果层级是3层
    // 考虑递归应该怎么写呢？
    // resetTags() {
    //   this.tags.forEach(item => {
    //     if (item.children) {
    //       item.children.forEach(child => {
    //         child.selected = false;
    //       });
    //     }
    //   });
    // },
    handleMouseMove(event) {
      // 可以考虑使用延时函数来提高性能
      if (this.selectedTag) {
        this.$refs.logoImg.style.left = (event.pageX - 220 - 70) + 'px';
        this.$refs.logoImg.style.top = (event.pageY - 80) + 'px';
      }
    },
    handleMouseDown(event) {
      // console.log('page', event.pageX + ',' + event.pageY);
      // this.$refs.logoImg.style.left = (event.pageX - 220) + 'px';
      // this.$refs.logoImg.style.top = (event.pageY - 80) + 'px';
      if (this.selectedTag) {
        // this.resetTags();
        this.selectedTag.selected = false;
        this.selectedTag = null;
      }
    },
    selectTag(item) {
      this.selectedTag = item;
    },
    cancelSelectedTag() {
      this.selectedTag = null;
      // 需要操作标签导航，取消其选中样式
      this.$refs.tagNav.reset();
    }
  }
}
</script>

<style lang="scss">
.intel-model {
    .condition-wrapper {
        margin: 30px 0 0 100px;
    }
    .movelogo {
        position: absolute;
        min-width: 60px;
        height: 25px;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .tags-wrapper {
        position: fixed;
        right: 20px;
        top: 50%;
        min-width: 200px;
        transform: translateY(-50%);
    }
    .saveBtn {
        position: fixed;
        right: 300px;
        bottom: 100px;
    }
}
</style>
