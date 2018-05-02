<template lang="html">
<div class="test">
  <split-pane :height="200" split="vertical" :initPercent="50">
    <slot slot="paneL">
      <div  class="left-pane">LeftPane</div>
    </slot>
    <slot slot="paneR">
      <split-pane split="horizontal">
        <slot slot="paneL">
          <div class="top-pane">topPane</div>
        </slot>
        <slot slot="paneR">
          <div class="bottom-pane">bottomPane</div>
        </slot>
      </split-pane>
    </slot>
  </split-pane>
</div>
</template>

<script>
import SplitPane from '@/components/common/SplitPane/SplitPane.vue';
export default {
  components: {
    SplitPane
  }
}
</script>

<style lang="scss">
.test {
    .left-pane {
        background-color: pink;
        height: 100%;
    }
    .top-pane {
        background-color: blue;
        height: 100%;
    }
    .bottom-pane {
        background-color: yellow;
        height: 100%;
    }
}
</style>
