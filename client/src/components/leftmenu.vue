<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
                    mode="vertical"
                    background-color="#293446"
                    text-color="#fff"
                    active-text-color="#409eff"
                    class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>



                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children"
                                     :to="citem.path" :key="cindex">
                            <el-menu-item
                                    :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>



            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "leftmenu",
        data(){
            return {
                items:[
                    {
                        icon:'fa-group',
                        name:'员工资料',
                        path:'fund',
                        children:[{
                            path:'FundList',
                            name:'基本资料'
                        },{
                            path:'BasicList',
                            name:'其他资料'
                            },{
                            path:'SeniorList',
                            name:'高级资料'
                        }]
                    },
                    {
                        icon:'fa-money',
                        name:'工资管理',
                        path:'wages',
                        children:[{
                            path:'CompanyAccountSet',
                            name:'企业账套'
                        },{
                            path:'zhangtao',
                            name:'员工账套'
                        },{
                            path:'zhangtao',
                            name:'员工积分'
                        },{
                            path:'zhangtao',
                            name:'月末处理'
                            }]
                    },
                    {
                        icon:'fa-address-card',
                        name:'人事管理',
                        path:'vhr',
                        children:[{
                            path:'FundList',
                            name:'员工调动'
                        },{
                            path:'zhangtao',
                            name:'员工调薪'
                        },{
                            path:'zhangtao',
                            name:'员工奖惩'
                        },{
                            path:'zhangtao',
                            name:'在线聊天'
                        },{
                            path:'zhangtao',
                            name:'发布邮件'
                        },{
                            path:'zhangtao',
                            name:'系统消息'
                        }
                        ]
                    },
                    {
                        icon:'fa-bar-chart',
                        name:'统计管理',
                        path:'Statistics',
                        children:[{
                            path:'FundList',
                            name:'综合信息统计'
                        },{
                            path:'zhangtao',
                            name:'人事信息统计'
                        },{
                            path:'zhangtao',
                            name:'员工积分统计'
                        }]
                    },
                    {   icon:'fa-sun-o',
                        name:'系统管理',
                        path:'info',
                        children:[{
                            path:'infoshow',
                            name:'个人信息'
                        },{
                            path:'infoshow',
                            name:'操作管理'
                        }]
                    }
                ]
            }
        },
        computed:{
            user(){
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #293446;
        z-index: 99;
    }
    .el-menu {
        border: none;
    }
    .fa-margin {
        margin-right: 5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo {
        width: 35px;
    }
    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }
    a {
        text-decoration: none;
    }
</style>
