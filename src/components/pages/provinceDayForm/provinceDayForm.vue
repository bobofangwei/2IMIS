<template>
    <div class="provinceDayForm-wrapper">
        <div class="main-wrapper">
            <breadbar></breadbar>
            <div class="query-form-wrapper">
                <el-form label-position="left" ref="form" :module="queryFormData" label-width="150px" :inline="true">
                    <el-form-item label="更改产品类型:">
                        <el-select v-model="queryFormData.selectedProduct">
                            <el-option v-for="(product,code) in products" :key="code" :value="code" :label="product"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                         <el-button type="primary" @click="queryByProvince">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="data-form-wrapper">
                 <el-table   :data="productData"  border      style="width: 100%">
                <el-table-column v-for="item in tableHeaderData"
                  :prop="item.prop"
                  :label="item.label"
                 >
                </el-table-column>
               
              </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import breadbar from '@/components/common/breadbar/breadbar.vue';
    export default{
        data: function() {
            return {
                products: {
                    0: '合计',
                    1: '腾讯网卡',
                    2: '蚂蚁宝卡'
                },
                queryFormData: {
                   selectedProduct: '合计'
                },
                tableHeaderData: [
                    {
                        prop: 'province',
                        label: '类别'
                    }, {
                        prop: 'sumUser',
                        label: '用户总数'
                    }, {
                        prop: 'yesterdayXinzeng',
                        label: '昨日新增'                     
                    }, {
                        prop: 'monthXinzeng',
                        label: '本月新增'                     
                    }, {
                        prop: 'yesterdayTingji',
                        label: '昨日停机'                     
                    }, {
                        prop: 'yesterdayQianfei',
                        label: '昨日欠费'                      
                    }, {
                        prop: 'yesterdayXiaohu',
                        label: '昨日销户'                      
                    },
                     {
                        prop: 'yesterdayShouchong',
                        label: '昨日首充'                      
                    }
                ],
                productData: [{
                    'province': '北京',
                    'yesterdayXinzeng': 110,
                    'monthXinzeng': 111111,
                    'yesterdayTingji': 105,
                    'yesterdayQianfei': 101,
                    'yesterdayXiaohu': 1000,
                    'yesterdayShouchong': 101,
                    'sumUser': 111111
                }, {
                    'province': '上海',
                    'yesterdayXinzeng': 110,
                    'monthXinzeng': 111111,
                    'yesterdayTingji': 105,
                    'yesterdayQianfei': 101,
                    'yesterdayXiaohu': 1000,
                    'yesterdayShouchong': 101,
                    'sumUser': 111111
                }]
            };
        },
        methods: {
            queryByProvince: function() {
                console.log(JSON.stringify(this.queryFormData));
            }
        },
        components: {
            breadbar
        }
    };
</script>
<style lang="scss" scope>
.provinceDayForm-wrapper{
    .main-wrapper{
        width:90%;
        margin:20px auto;
    }
    .query-form-wrapper{
        margin-top:15px;
    }

}
</style>
