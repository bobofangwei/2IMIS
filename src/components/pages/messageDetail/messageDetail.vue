<template lang="html">
  <div class="message-detail">
    <el-tabs type="border-card" v-model="activeTabName">
      <el-tab-pane v-for="item in tabMap" :label="item.label" :name="item.type" :key="item.type">
          <keep-alive>
        <tab-pane :type="item.type" v-if="activeTabName===item.type" :product="$route.params.id"></tab-pane>
        </keep-alive>
      </el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/tabPane.vue';
export default {
  data() {
    return {
      tabMap: [{
          type: 'chongzhi',
          label: '充值短信提醒'
        },
        {
          type: 'koufei',
          label: '扣费短信提醒'
        },
        {
          type: 'zhuanru',
          label: '外套餐转入短信提醒'
        }
      ],
      activeTabName: 'chongzhi'
    };
  },
  components: {
    tabPane
  }
}
</script>

<style lang="scss" scoped>
.message-detail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #FFF;
    padding: 20px 5% 30px 3%;

}
</style>
