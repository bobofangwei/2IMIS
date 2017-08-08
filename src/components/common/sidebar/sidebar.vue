<template>
    <div class="sidebar">
        <el-menu default-active="$route.path" theme="dark" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in allRouters" v-if="!item.meta.hidden && item.children">
                <el-submenu :index="item.path">
                    <template slot="title"><i :class="item.meta.icon"></i>{{item.meta.title}}</template>
                    <el-menu-item v-for="childItem in item.children" v-if="!item.meta.hidden" :index="item.path+'/'+childItem.path">{{childItem.meta.title}}</el-menu-item>
                </el-submenu>
            </template>
            <template v-else-if="!item.meta.hidden">
                <el-menu-item :index="item.path">{{item.meta.title}}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'allRouters'
        ])
    }
};
</script>
<style lang="scss" scope>
.sidebar {
    width: 100%;
    height: 100%;
}
</style>
