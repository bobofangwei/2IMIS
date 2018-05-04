<template lang="html">
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
// 折叠面板组件
export default {
  name: 'Collapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    activeIndexes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      curActiveIndexes: this.activeIndexes
    }
  },
  watch: {
    activeIndexes(newVal) {
      this.curActiveIndexes = newVal;
    }
  },
  mounted() {
    this.initPanes();
  },
  methods: {
    getPanes() {
      return this.$children;
    },
    initPanes() {
      let panes = this.getPanes();
      // 设置name属性
      panes.forEach((pane, index) => {
        if (!pane.curIndex) {
          // 不能在组件中，直接更改prop的值
          pane.curIndex = index + '';
        }
      });
    },
    updateAcitiveIndexes(index) {
      if (this.accordion) {
        this.curActiveIndexes = [index];
      } else {
        let i = this.curActiveIndexes.indexOf(index);
        if (i >= 0) {
          this.curActiveIndexes.splice(i, 1, 1);
        } else {
          this.curActiveIndexes.push(index);
        }
      }
    },
    updateDom() {
      let panes = this.getPanes();
      panes.forEach(item => {
        if (this.curActiveIndexes.indexOf(item.curIndex) >= 0) {
          item.open();
        } else {
          item.close();
        }
      });
    },
    update(index) {
      this.updateAcitiveIndexes(index);
      this.updateDom();
    }
  }
}
</script>

<style lang="scss">
.collapse {}
</style>
