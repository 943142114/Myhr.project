<template>
    <div class="fillcontain">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">人事管理</el-breadcrumb-item>
            <el-breadcrumb-item >系统消息</el-breadcrumb-item>
        </el-breadcrumb>


        <div>
            <el-form :inline="true" ref="search_data" :model="search_data">
<!--                <el-form-item label="">-->
<!--                    <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>-->
<!--                    &#45;&#45;-->
<!--                    <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-button type="primary" size="big" icon="search" @click="onScreeoutMoney()">筛选</el-button>-->
<!--                </el-form-item>-->
                <el-form-item class="btnRight" v-if="user.identity == 'admin'">
                    <el-button
                            type="primary"
                            size="big"
                            icon="view"
                            @click="onAddMoney()">点击发布消息</el-button>
                </el-form-item>
            </el-form>
        </div>

        <p v-for="todo in messtabledata" class="onemessages" >公告信息 : {{todo.allhrmessages}} <br><br><br><br><span class="onemessagesspan">时间：{{todo.date}}</span></p>

        <br>


        <!--        基本资料-->
        <div class="table_container" v-if="user.identity == 'admin'">
            <el-table
                    v-if="tableData.length > 0"
                    :data="tableData"
                    max-height="450"
                    border
                    style="width: 45%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建日期"
                        align="center"
                        width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>


                <el-table-column
                        prop="allhrmessages"
                        label="公告数据"
                        align="center"
                        width="235">
                </el-table-column>



                <el-table-column
                        prop="operation"
                        align="center"
                        fixed="right"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                v-if="user.identity=='admin'&&'manager'"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>



            </el-table>

<!--            分页-->
            <el-row v-if="user.identity == 'admin'">
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination

                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="paginations.page_index"
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total"
                        >
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

        </div>
        <MessagesDialog :dialog="dialog" :formData="formData" @update="getProfile"></MessagesDialog>
    </div>
</template>

<script>
    import MessagesDialog from "../components/MessagesDialog";

    export default {
        name: "Monthend",
        data() {
            return {
                search_name: {
                    sname: ''
                },

                search_data: {
                    startTime: "",
                    endTime: ""
                },
                search_people: {
                    speople: ''
                },
                filtertableData: [],
                tableData: [],
                messtabledata:[],
                alltabledata: [],
                dialog: {
                    show: false,
                    title: '',
                    option: 'edit'
                },
                formData: {
                    allhrmessages:''
                },
                paginations: {
                    page_index: 1, //当前位于哪页
                    total: 0,//当前数据总数
                    page_size: 7,//一页显示多少条 //5
                    page_sizes: [5, 10, 20],//每页显示多少条 //5,10,15
                    layout: "total,sizes,prev,pager,next,jumper"//翻页属性
                }
            };
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        components: {
            MessagesDialog

        },
        mounted() {
            this.getProfile();
        },
        methods: {
            onScreeoutMoney() {
                // 筛选
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getProfile();
                    return;
                }
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();

                this.allTableData = this.filterTableData.filter(item => {
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                });
                // 分页数据
                this.setPaginations();
            },

            //获取表格数据
            getProfile() {
                this.$axios.get('/api/messages')
                    .then(res => {
                        this.alltabledata = res.data
                        this.filtertableData = res.data
                        this.messtabledata = res.data
                        console.log(this.messtabledata)
                        // this.allme = res.data
                        //设置分页数据
                        this.setPaginations()

                    })
                    .catch(err => console.log(err))
            },

            //编辑
            handleEdit(index, row) {
                //编辑
                this.dialog = {
                    show: true,
                    title: "修改信息",
                    option: 'edit'
                };
                this.formData = {
                    allhrmessages:row.allhrmessages
                }
            },

            //删除
            handleDelete(index, row) {
                //删除
                this.$axios.delete(`api/messages/delete/${row._id}`).then(res => {
                    this.$message('删除成功');
                })
                this.getProfile();
            },

            //添加
            onAddMoney() {
                this.dialog = {
                    show: true,
                    title: "发布公告信息",
                    option: 'add'
                };
                this.formData = {

                    allhrmessages:''
                }
            },

            //分页
            setPaginations() {
                //分页属性
                this.paginations.total = this.alltabledata.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 7;
                //设置默认的分页数据
                this.tableData = this.alltabledata.filter((item, index) => {
                    return index < this.paginations.page_size
                })
            },

            //切换size
            handleSizeChange(page_size) {
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tableData = this.alltabledata.filter((item, index) => {
                    return index < page_size
                })
            },

            //获取当前页
            handleCurrentChange(page) {
                let index = this.paginations.page_size * (page - 1);
                let nums = this.paginations.page_size * page
                let tables = [];
                for (let i = index; i < nums; i++) {
                    if (this.alltabledata[i]) {
                        tables.push(this.alltabledata[i])
                    }
                    this.tableData = tables;
                }
            },


            handleSearchpeople() {
                if (!this.search_people.speople) {
                    this.$message({
                        type: 'warning',
                        message: "请填写经办人"
                    });
                    this.getProfile()
                    return;
                }
                const speople = this.search_people.speople
                this.alltabledata = this.filtertableData.filter(item => {
                    // console.log(item)
                    let people = item.handlepeople
                    return people == speople
                })
                this.setPaginations();
            },
        }
    }
</script>

<style scoped>
    .onemessagesspan{
        font-size: 18px;
        float: right;
        margin-right: 20px;
    }
    .onemessages{
        padding-top: 20px;
        padding-left: 20px;
        padding-bottom: 25px;
        background-color:#e3f0f1 ;
        font-size: 24px;
        margin-bottom: 20px;
    }
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .btnRight {
    }
    .pagination {
        margin-left: 370px;
        margin-top: 10px;
    }
    .btnleft{
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .table_container{
        margin-top: -10px;
    }
</style>
