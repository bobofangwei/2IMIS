<template>
    <div class="normalTable-wrapper">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item> <i class="el-icon-setting"></i> 明细</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="queryform-wrapper">
            <el-form ref="searchForm" label-position="left" :inline="true" :model="querys">
                <div class="form-group">
                    <el-form-item label="年龄:">
                        <el-input-number size="small" v-model="querys.minAge" :min="0" :max="100"></el-input-number>
                        到
                        <el-input-number size="small" v-model="querys.maxAge" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-radio-group v-model="querys.sex">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="归属地:">
                        <el-select v-model="querys.provinces" multiple placeholder="请选择">
                            <el-option v-for="(label,value) in config.provinces" :key="value" :label="label" :value="value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item label="余额:">
                        <el-input-number size="small" v-model="querys.minBalance" :min="-9999" :max="10000" :step="10"></el-input-number>
                        到
                        <el-input-number size="small" v-model="querys.maxBalance" :min="-9999" :max="10000" :step="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="产品名称:">
                        <el-select v-model="querys.products" multiple placeholder="请选择">
                            <el-option v-for="(label,value) in config.products" :key="value" :label="label" :value="value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <el-select v-model="querys.states" multiple placeholder="请选择">
                            <el-option v-for="(label,value) in config.states" :key="value" :label="label" :value="value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item label="入网时间:">
                        <el-date-picker v-model="querys.daterange" type="daterange" placeholder="选择日期范围">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="充值情况:">
                        <el-checkbox-group v-model="querys.recharge">
                            <el-checkbox :label="0">首充</el-checkbox>
                            <el-checkbox :label="1">次充</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div class="btn-wrapper">
                        <el-button type="info" size="small" @click="sumitSearchForm">查询</el-button>
                        <el-button type="warning" size="small">导出</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="table-wrapper">
            <el-table :data=tableBodyData border fit>
                <template v-for="item in tableHeaderData" v-if="item.children">
                    <el-table-column :label="item.label">
                        <el-table-column v-for="subItem in item.children" :label="subItem.label" :prop="subItem.prop">
                        </el-table-column>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column :label="item.label" :prop="item.prop">
                    </el-table-column>
                </template>>
            </el-table>
            <div class="pager-wrapper">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data: function() {
        return {
            tableHeaderData: [{
                label: '用户资料',
                children: [{
                    label: '手机号码',
                    prop: 'serial_number'
                }, {
                    label: '姓名',
                    prop: 'cust_name'
                }, {
                    label: '联系号码',
                    prop: 'contact_phone'
                }, {
                    label: '性别',
                    prop: 'sex'
                }, {
                    label: '年龄',
                    prop: 'age'
                }, {
                    label: '归属地',
                    prop: 'province_name'
                }, {
                    label: '激活时间',
                    prop: 'open_account_time'
                }]
            }, {
                label: '产品信息',
                children: [{
                    label: '产品名称',
                    prop: 'product_name'
                }, {
                    label: '产品ID',
                    prop: 'product_id'
                }, {
                    label: '月费',
                    prop: 'fee'
                }]
            }, {
                label: '状态信息',
                children: [{
                    label: '用户状态',
                    prop: 'state_name'
                }, {
                    label: '余额',
                    prop: 'leave_real_fee'
                }, {
                    label: '剩余时间',
                    prop: 'leave_fee_time'
                }, {
                    label: '信用额度',
                    prop: 'credit_fee'
                }]
            }, {
                label: '首充情况',
                children: [{
                    label: '是否首充',
                    prop: 'pay_first_tag'
                }, {
                    label: '首充金额',
                    prop: 'pay_first_fee'
                }, {
                    label: '首充时间',
                    prop: 'pay_first_time'
                }]
            }, {
                label: '二充情况',
                children: [{
                    label: '是否二充',
                    prop: 'pay_second_tag'
                }, {
                    label: '首充金额',
                    prop: 'pay_second_fee'
                }, {
                    label: '首充时间',
                    prop: 'pay_second_time'
                }]
            }, {
                label: '提取时间',
                prop: 'update_time'
            }],
            tableBodyData: [],
            currentPage: 1,
            total: -1,
            pageSize: 10,
            querys: {
                // -1代表尚未选择，0代表男性，1代表女性
                sex: '',
                minAge: 0,
                maxAge: 100,
                provinces: [],
                products: [],
                states: [],
                minBalance: -9999,
                maxBalance: 10000,
                daterange: '',
                recharge: []
            },
            config: {
                provinces: {
                    0: '北京',
                    1: '上海'
                },
                products: {
                    0: '腾讯大王卡',
                    1: '蚂蚁宝卡'
                },
                states: {
                    0: '正常',
                    1: '全停',
                    2: '半停'
                }
            }
        };
    },
    created: function() {
        // getProductInfo().then(res => {
        //     console.log(res.data);
        //     this.tableBodyData = res.data;
        //     this.total = this.tableBodyData.length;            
        // }).catch(err => {
        //     console.log('获取基本信息表格数据失败', err);
        // });
    },
    methods: {
        handleCurrentChange: function(currentPage) {
            // 分页控件改变时触发
            console.log(currentPage);
        },
        sumitSearchForm: function() {
            // 提交查询关键词，请求后台数据
            console.log(JSON.stringify(this.querys));
        }
    }
};
</script>
<style lang="scss" scope>
$blue:#20A0FF;
.normalTable-wrapper {
    width: 90%;
    margin: 0 auto;
    .queryform-wrapper {
        margin-top: 20px;
        .el-form-item__label {
            font-weight: 600;
            margin-left: 20px;
            color: $blue;
        }
        .el-form-item {
            margin-bottom: 15px;
        }
        .btn-wrapper {
            float: right;
        }
    }
    .table-wrapper {
        .cell {
            text-align: center;
        }
    }
    .pager-wrapper {
        float: right;
        margin-top: 15px;
    }
}
</style>
