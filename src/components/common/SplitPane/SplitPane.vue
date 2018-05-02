<template lang="html">
<div class="split-pane" :style="splitPaneStyle" :class="splitPaneClass" @mouseup="mouseupHandler" @mousemove="mousemoveHandler($event)">
  <div class="paneL" :style="{[type]:percent+'%'}">
    <slot name="paneL"></slot>
  </div>
  <split-pane-resizer :split="split" :percent="percent" :resizerMouseDown="resizerMouseDown"></split-pane-resizer>
  <div class="paneR" :style="{[type]:(100-percent)+'%'}">
    <slot name="paneR"></slot>
  </div>
</div>
</template>

<script>
import SplitPanePane from './SplitPanePane';
import SplitPaneResizer from './SplitPaneResizer';
export default {
  components: {
    SplitPanePane,
    SplitPaneResizer
  },
  data() {
    return {
      percent: this.initPercent,
      active: false
    };
  },
  props: {
    split: {
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) > -1;
      },
      required: true
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    initPercent: {
      type: Number,
      default: 50
    },
    // 拖动的富余量，默认拖动到距离父元素10%的位置，不能再被拖动
    margin: {
      type: Number,
      default: 10
    }
  },
  computed: {
    splitPaneClass() {
      return [this.split];
    },
    splitPaneStyle() {
      return {
        width: !this.width ? '100%' : this.width + 'px',
        height: !this.height ? '100%' : this.height + 'px'
      };
    },
    type() {
      return this.split === 'vertical' ? 'width' : 'height';
    }
  },
  methods: {
    // 分割条被按下
    resizerMouseDown() {
      this.active = true;
      // console.log('mousedown', 'activeTrue');
    },
    // 鼠标弹起
    mouseupHandler() {
      this.active = false;
      // console.log('mouseup', 'activeFalse');
    },
    // 鼠标移动
    mousemoveHandler(e) {
      if (this.active) {
        let currentTarget = e.currentTarget;
        let offset = this.split === 'vertical' ? currentTarget.getBoundingClientRect().left : currentTarget.getBoundingClientRect().top;
        // 获取鼠标相对于屏幕的坐标
        let eOffset = this.split === 'vertical' ? e.clientX : e.clientY;
        let targetOffset = this.split === 'vertical' ? currentTarget.offsetWidth : currentTarget.offsetHeight;
        let percent = Math.floor(((eOffset - offset) / targetOffset) * 10000) / 100;
        if (percent > this.margin && percent < 100 - this.margin) {
          this.percent = percent;
        }
        this.$emit('resize', percent);
      }
    }
  }
}
</script>

<style lang="scss">
.split-pane {
    position: relative;
    width: 100%;
    height: 100%;
    &.horizontal > .paneL {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    &.horizontal > .paneR {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    &.vertical > .paneL {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
    &.vertical > .paneR {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
    }
}
</style>
