<template>
    <el-breadcrumb separator="/" class="breadbar">
        <el-breadcrumb-item v-for="(item,index) in matchedRoutes"><i class="el-icon-setting" v-if="index===0"></i> {{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                matchedRoutes: []
            };
        },
        created() {
            this.matchedRoutes = this.getMatchedRoutes();
        },
        methods: {
            getMatchedRoutes() {
                return this.$route.matched.map((matchedRoute) => {
                    return {title: matchedRoute.meta.title};
                });
            }
        },
        watch: {
            $route() {
                this.matchedRoutes = this.getMatchedRoutes();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .breadbar{
        margin-bottom: 10px;
    }
</style>
