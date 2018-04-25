<template lang="html">
<div class="intel-model" @mousemove="handleMouseMove($event)" @mousedown="handleMouseDown($event)">
  <img src="./logo.png" alt="logo" class="movelogo" ref="logoImg" :style="logoStyle">
  <div class="condition-wrapper">
    <intel-hold-strategy></intel-hold-strategy>
  </div>
  <div class="tags-wrapper">
    <!--
    <el-tree :data="tags" :props="tagProps" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
      <div class="custom-tree-node" slot-scope="{ node, data }" :class="{selected:data.selected}">
        <span>{{data.label}}</span>
      </div>
    </el-tree>
  -->
  <intel-hold-tags></intel-hold-tags>
  </div>
</div>
</template>

<script>
import {
  isEmptyObject
} from '@/util/index.js';
import {
  tagsData as tags
} from './config/index.js';
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
      tagProps: {
        label: 'label',
        children: 'children'
      },
      // 相当于一次深度复制
      tags: JSON.parse(JSON.stringify(tags)),
      selectedTag: null, // 当前选中的标签
      logoStyle: {
        display: 'none'
      }
    }
  },
  watch: {
    selectedTag(newVal) {
      if (!newVal) {
        this.logoStyle = {
          display: 'none'
        };
      } else {
        this.logoStyle = {
          display: ''
        };
      }
    }
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
    handleNodeClick(data, node, tree) {
      if (node.isLeaf) {
        // 封装之后的node对象，而非原始的dom对象，如何修改样式类？
        // this.resetTags();
        if (this.selectedTag) {
          this.selectedTag.selected = false;
        }
        data.selected = true;
        this.selectedTag = data;
        console.log(this.selectedTag);
      }
    }
  }
}
</script>

<style lang="scss">
.intel-model {
    overflow: hidden;
    .movelogo {
        position: absolute;
        width: 60px;
        height: 25px;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .tags-wrapper {
        width: 20%;
        float: left;
        text-align: center;
        .custom-tree-node {
            position: relative;
            font-size: 18px;
            height: 45px;
            line-height: 45px;
        }
        .custom-tree-node.selected:before {
            content: '';
            position: absolute;
            top: 12px;
            left: -40px;
            width: 30px;
            height: 13px;
            background-image: url("./logo.png");
            background-size: 100% 100%;
        }
    }
    .condition-wrapper {
        width: 70%;
        float: left;
    }

}
</style>
