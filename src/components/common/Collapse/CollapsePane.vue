<template lang="html">
  <div class="collapse-pane">
    <div class="pane-title" @click="update">{{title}}</div>
    <div class="pane-content" v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsePane',
  customOption: 'collapsePane',
  props: {
    title: {
      type: String,
      requried: true
    },
    index: {
      type: String,
      default: ''
    }
  },
  watch: {
    index(newVal) {
      this.curIndex = newVal;
    }
  },
  data() {
    return {
      show: false,
      curIndex: this.index
    };
  },
  methods: {
    update() {
      this.$parent.update(this.curIndex);
    },
    open() {
      if (this.show) {
        return;
      }
      this.show = true;
    },
    close() {
      if (!this.show) {
        return;
      }
      this.show = false;
    },
    toggle() {
      if (this.show) {
        this.close();
      } else {
        this.open();
      }
    }
  }
}
</script>

<style lang="scss">
.collapse-pane {
    .pane-title {
        height: 35px;
        line-height: 35px;
        padding: 0 20px;
        border-top: 1px solid #333;
        background-color: #F2F6FC;
        cursor: pointer;
    }
    .pane-content {
        line-height: 30px;
        padding: 20px;
    }
}
.collapse-pane:last-child > .pane-content {
    border-bottom: 1px solid #333;
}
</style>
