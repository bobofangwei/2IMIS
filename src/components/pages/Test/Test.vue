<template lang="html">
<div class="test">
  <collapse :accordion="true">
    <collapse-pane title="bobo" name="1">
      <div>与现实生活保持一直，遵循用户习惯的语言和概念</div>
    </collapse-pane>
    <collapse-pane title="leishao" name="2">
      <div>帮助用户识别，界面简单直白，让用户快速识别而非回忆</div>
    </collapse-pane>
  </collapse>
</div>
</template>

<script>
import Collapse from '@/components/common/Collapse/Collapse.vue';
import CollapsePane from '@/components/common/Collapse/CollapsePane.vue'
export default {
  components: {
    Collapse,
    CollapsePane
  }
}
</script>

<style lang="scss">
.test {}
</style>
