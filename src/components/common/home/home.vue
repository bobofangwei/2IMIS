<template>
    <div class="home-wrapper">
        <div class="home-header">
            <v-header></v-header>
        </div>
        <div class="home-sidebar">
            <v-sidebar></v-sidebar>
        </div>
        <div class="home-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script type="text/javascript">
import Sidebar from '../sidebar/sidebar.vue';
import Header from '../header/header.vue';
export default {
    data: function() {
        return {};
    },
    components: {
        'v-sidebar': Sidebar,
        'v-header': Header
    }
};
</script>
<style lang="scss" scope>
.home-wrapper {
    .home-header {
        width: 100%;
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
    }
    .home-sidebar {
        position: fixed;
        width: 250px;
        top: 80px;
        bottom: 0;
        left: 0;
        .el-menu {
            height: 100%;
            padding-top: 15px;
        }
    }
    .home-content {
        position: absolute;
        top: 80px;
        left: 250px;
        right: 0;
        padding: 20px 0;
    }
}
</style>
