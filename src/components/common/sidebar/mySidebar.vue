<template>
    <el-menu mode="vertical" :default-active="$route.path">
        <my-sidebar-item></my-sidebar-item>
    </el-menu>
</template>
<script>
    import mySidebarItem from './mySidebarItem';
    export default {
        components:{mySidebarItem}
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu{
        min-height: 100%;
    }
</style>