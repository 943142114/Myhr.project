<template>
    <div class="fillcontain">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">统计管理</el-breadcrumb-item>
            <el-breadcrumb-item >人事信息统计</el-breadcrumb-item>
        </el-breadcrumb>

    </div>
</template>

<script>
    export default {
        name: "HrStatistics"
    }
</script>


<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
