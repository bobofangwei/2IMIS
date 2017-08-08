<template>
    <div class="productDayForm-wrapper">
        <div class="main-wrapper">
            <breadbar></breadbar>
            <div class="query-form-wrapper">
                <el-form ref="form" label-position="left" :module="queryFormData" label-width="100px" :inline="true">
                    <el-form-item label="更改地域:">
                        <el-select v-model="queryFormData.selectedProvince">
                            <el-option v-for="(province,code) in provinces" :key="code" :value="code" :label="province"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryByProvince">查询</el-button>
                        <download-btn :data="productData" :header="tableHeaderData"></download-btn>
                    </el-form-item>
                </el-form>
            </div>
            <div class="data-form-wrapper">
                <el-table  :header="tableHeaderData"  :data="productData"  border  style="width: 100%">
                    <el-table-column v-for="item in tableHeaderData"
                  :prop="item.prop"
                  :label="item.label"
                 ></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Schart from 'vue-schart';
import breadbar from '@/components/common/breadbar/breadbar.vue';
import downloadBtn from '@/components/common/downloadBtn/downloadBtn.vue';
    export default{
        data: function() {
            return {
                provinces: {
                    0: '所有',
                    1: '北京',
                    2: '上海'
                },
                queryFormData: {
                   selectedProvince: '全国'
                },
                tableHeaderData: [
                    {
                        prop: 'product',
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
                    'product': '腾讯网卡',
                    'yesterdayXinzeng': 110,
                    'monthXinzeng': 111111,
                    'yesterdayTingji': 105,
                    'yesterdayQianfei': 101,
                    'yesterdayXiaohu': 1000,
                    'yesterdayShouchong': 101,
                    'sumUser': 111111
                }, {
                    'product': '蚂蚁宝卡',
                    'yesterdayXinzeng': 110,
                    'monthXinzeng': 111111,
                    'yesterdayTingji': 105,
                    'yesterdayQianfei': 101,
                    'yesterdayXiaohu': 1000,
                    'yesterdayShouchong': 101,
                    'sumUser': 111111
                }],
                chartData: {
                    barChart: {
                        canvasId: 'barCanvas',
                        type: 'bar',
                        width: 500,
                        height: 400
                    }
                }
            };
        },
        components: {
            breadbar,
            downloadBtn
        },
        methods: {
            queryByProvince: function() {
                console.log(JSON.stringify(this.queryFormData));
            }
        }
    };
</script>
<style lang="scss" scope>
.productDayForm-wrapper{
    .main-wrapper{
        width:90%;
        margin:20px auto;
    }
    .query-form-wrapper{
        margin-top:15px;
    }
}
</style>
