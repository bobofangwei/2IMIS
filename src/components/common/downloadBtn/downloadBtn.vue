<template>
  <a ref="link" class="download-btn" v-on:click="handleClick">导出</a>
</template>
<script type="text/javascript">
export default {
  props: {
    header: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fileName: {
      type: String,
      default: 'data.csv'
    }
  },
  methods: {
    handleClick: function() {
      var csvContent = 'data:text/csv;charset=utf-8,\ufeff';
      csvContent += this.deadedHeader + '\n';
      this.data.forEach((item, index) => {
        let dataString = '';
        for (var key in item) {
          dataString += item[key] + ',';
        }
        csvContent += index < this.data.length ? dataString.replace(/,$/, '\n') : dataString.replace(/,$/, '');
      });
      this.$refs.link.setAttribute('href', encodeURI(csvContent));
      this.$refs.link.setAttribute('download', this.fileName);
    }
  },
  computed: {
    // 要求head是数组，数组中的每个元素是对象，并且每个对象都有label属性
    deadedHeader: function() {
      let result;
      result = this.header.map((item) => {
        return item.label;
      })
      result = result.join(',');
      return result;
    }
  }
}

</script>
<style lang="scss" scoped>
.download-btn {
  display: inline-block;
  margin-left: 10px;
  padding: 2px 15px;
  font-size: 12px;
  border-radius: 4px;
  color: #FFF;
  background-color: #f7ba2a;
  border-color: #f7ba2a;
  outline: 0;
  text-align: center;
  -webkit-appearence: none;
  appearence: none;
  cursor: pointer;
}

</style>
