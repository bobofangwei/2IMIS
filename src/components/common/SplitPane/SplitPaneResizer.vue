<template lang="html">
<div class="split-pane-resizer" :class="resizerClass" :style="resizerStyle" @mousedown="resizerMouseDown"></div>
</template>

<script>
export default {
  props: {
    split: {
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) > -1;
      },
      required: true
    },
    percent: {
      type: Number,
      required: true
    },
    resizerMouseDown: {
      type: Function,
      required: true
    }
  },
  computed: {
    resizerClass() {
      return [this.split];
    },
    resizerStyle() {
      if (this.split === 'vertical') {
        return {
          left: this.percent + '%'
        };
      } else {
        return {
          top: this.percent + '%'
        };
      }
    }
  },
  methods: {
    resize() {

    }
  }
}
</script>

<style lang="scss">
.split-pane-resizer {
    position: absolute;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    &.vertical {
        width: 10px;
        top: 0;
        bottom: 0;
        margin-left: -5px;
        cursor: e-resize;
    }
    &.horizontal {
        height: 10px;
        left: 0;
        right: 0;
        margin-top: -5px;
        cursor: n-resize;
    }
}
</style>
