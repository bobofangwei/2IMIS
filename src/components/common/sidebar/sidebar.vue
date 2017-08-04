<template>
    <div class="sidebar">
        <el-menu default-active="normalTable" theme="dark" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in menuData" v-if="item.children">
                <el-submenu :index="item.index">
                    <template slot="title"><i :class="item.icon"></i>{{item.text}}</template>
                    <el-menu-item v-for="childItem in item.children" :index="childItem.index">{{childItem.text}}</el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index"><i :class="item.icon"></i>{{item.text}}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script type="text/javascript">
export default {
    data: function() {
        return {
            menuData: [ {
                index: '1',
                text: '日报表',
                icon: 'el-icon-document',
                children: [{
                    index: 'productDayForm',
                    route: '/productDayForm',
                    text: '产品发展报表'
                },
                {
                    index: 'provinceDayForm',
                    route: '/reportForm',
                    text: '区域发展报表'
                }]
            }, {
                index: '2',
                text: '明细',
                icon: 'el-icon-setting',
                children: [{
                    index: 'basicInfo',
                    route: '/basicInfo',
                    text: '基本信息'
                }, {
                    index: 'monthData',
                    route: '/monthData',
                    text: '月度数据'
                }]
            }]
        };
    }
};
</script>
<style lang="scss" scope>
.sidebar {
    width: 100%;
    height: 100%;
}
</style>
