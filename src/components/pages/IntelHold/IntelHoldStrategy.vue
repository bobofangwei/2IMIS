<template lang="html">
  <div class="intel-hold-strategy">
    <el-tree  :data="treeData" default-expand-all :expand-on-click-node="false" :indent="36">
      <div class="custom-tree-node" slot-scope="{ node, data }">
       <div class="rule" v-if="data.type==='rule'">
         <span @click="handleRuleClick(node,data, $event)">{{data.rule }}</span>
         --->
         <span @click="addRule(node,data)">新增下级组合规则</span>
         <span class="remove" v-if="!data.isRoot" @click="removeChild(node,data)"></span>
       </div>
       <div class="strategy" v-else="data.type==='strategy'">
         <span class="tagName">{{data.tag.label}}</span>
         <span class="operate" @click="changeOperate(node,data, $event)">{{data.curOperate}}</span>
        <input type="text" class="value" v-if="data.tag.operate!=='zhenjia'">
        <span class="remove" v-if="!data.isRoot" @click="removeChild(node,data)"></span>
       </div>
     </div>
    </el-tree>
    <div class="messageBox" v-show="boxShow" ref="box">
      <div class="box-title">
        请选择
        <span class="box-close" @click="boxClose"></span>
      </div>
      <ul class="box-list">
        <li v-for="(value,key) in boxData" class="box-item" :class="{selected: key===selectedBoxItemKey}" :key="key" @click="selectBoxItem(value,key)" >{{value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  operations
} from './config/index.js';
let id = 1;
const rules = {
  'jiaoji': '满足交集',
  'bingji': '满足任一',
  'chaji': '不满足任一'
};
const defaultOperate = {
  'jihe': 'shuyu',
  'daxiao': 'dayu',
  'zhenjia': 'shi'
};
export default {
  name: 'IntelHoldStrategy',
  props: {
    selectedTag: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      treeData: [{
        id: id,
        type: 'rule',
        rule: rules['jiaoji'],
        isRoot: true
      }],
      boxShow: false,
      boxData: rules,
      selectedBoxItemKey: 'jiaoji',
      selectedNode: null // 弹出框当前选中节点,
    };
  },
  methods: {
    // 获取某一种关系操作的默认值，比如集合关系的默认值为“属于”
    getCurOperate(curTag) {
      if ('curOperate' in curTag) {
        return operations[curTag.operate]['curOperate'];
      } else {
        return operations[curTag.operate][defaultOperate[curTag.operate]];
      }
    },
    getDefaultOperate(tag) {
      return operations[tag.operate][defaultOperate[tag.operate]];
    },
    handleRuleClick(node, data, $event) {
      // 在没有选中标签的时候，修改rule
      // 在具有选中标签的时候，新增一条规则
      if (this.selectedTag) {
        this.addStrategy(node, data);
      } else {
        this.changeRule(node, data, $event);
      }
    },
    showBox(node, $event) {
      this.boxShow = true;
      this.selectedNode = node;
      // 如何控制弹出框的位置
      console.log('event', $event);
      this.$refs.box.style.left = ($event.clientX - 100) + 'px';
      this.$refs.box.style.top = ($event.clientY + 30) + 'px';
    },
    changeRule(node, data, $event) {
      if (this.boxShow) {
        return;
      }
      // 修改rule，可能是满足交集，不满足交集等等的任意一个
      // 如何获得其位置，进而确定messageBox的位置呢？
      this.boxData = rules;
      this.showBox(node, $event);
    },
    changeOperate(node, data, $event) {
      if (this.boxShow) {
        return;
      }
      this.boxData = operations[data.tag.operate];
      this.showBox(node, $event);
    },
    addStrategy(node, data) {
      let newStrategyChild = {
        id: id++,
        type: 'strategy',
        tag: JSON.parse(JSON.stringify(this.selectedTag)),
        isRoot: false,
        curOperate: this.getDefaultOperate(this.selectedTag)
      };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newStrategyChild);
      this.$emit('cancelSelectedTag');
    },
    // 点击关闭消息提示框的处理函数
    boxClose() {
      this.selectedNode = null;
      this.boxShow = false;
    },
    // 点击“新增下级组合规则”，新添加一条规则
    addRule(node, data) {
      const newRuleChild = {
        id: id++,
        type: 'rule',
        rule: rules['jiaoji'],
        isRoot: false
      };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newRuleChild);
      console.log('treeData', this.treeData);
    },
    removeChild(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      let index = children.findIndex(item => {
        return item.id === data.id;
      });
      children.splice(index, 1);
    },
    // 选择消息提示框中的选项
    selectBoxItem(value, key) {
      // 控制样式
      this.selectedBoxItemKey = key;
      if (this.selectedNode) {
        let data = this.selectedNode.data;
        if (data.type === 'rule') {
          data.rule = value;
        } else if (data.type === 'strategy') {
          data.curOperate = value;
        }
      }
    }
  }
}
</script>

<style lang="scss">
$ruleColor: #38729d;
.intel-hold-strategy {
    .remove {
        display: inline-block;
        width: 11px;
        height: 11px;
        background-image: url("./imgs/del.gif");
        margin-left: 10px;
    }
    .value {
        min-width: 120px;
        padding: 0 3px;
        text-align: center;
        font-weight: bold;
        color: #D58D40;
        border: none;
        border-bottom: 1px solid #666;
        word-break: break-all;
        background: none;
    }
    .el-tree-node__content {
        height: 52px;
        line-height: 52px;
        font-size: 18px;
    }
    .el-tree-node__expand-icon {
        font-size: 18px;
        color: $ruleColor;
    }
    .rule {
        color: $ruleColor;
        font-weight: bold;
    }
    .strategy {
        font-size: 16px;
    }
    .strategy .tagName {
        color: #ef6d16;
    }
    .strategy .operate {
        color: #05a410;
    }
    .messageBox {
        z-index: 100;
        width: 300px;
        height: 400px;
        position: fixed;
        border: 1px solid #AAA;
        box-shadow: 0 0 5px #999, 0 0 40px rgba(0, 0, 0, 0.1) inset;
        padding: 15px;
        overflow: hidden;
        /*背景颜色别忘了，否则透明背景，会出现穿透效果*/
        background-color: #FFF;
        .box-title {
            text-align: center;
            overflow: hidden;
            height: 32px;
            line-height: 32px;
            font-size: 15px;
            color: #324057;
            font-weight: bold;
            .box-close {
                float: right;
                width: 32px;
                height: 32px;
                background-image: url("./imgs/close.png");
                background-size: 100% 100%;
                cursor: pointer;
            }
        }
        .box-item {
            cursor: pointer;
            line-height: 30px;
            height: 30px;
            color: #384459;
            font-size: 15px;
            position: relative;
            text-indent: 30px;
            position: relative;
            &.selected:before {
                content: '';
                width: 30px;
                height: 30px;
                background-image: url("./imgs/induce.png");
                background-size: 100% 100%;
                vertical-align: middle;
                margin-right: 10px;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

    }
}
</style>
