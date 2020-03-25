<template>
    <div class="fillcontain ">
        <div>
<!--            <el-from :inline="true" ref="add_data" :model="search_data" class="elfrom1">-->
<!--                &lt;!&ndash;筛选&ndash;&gt;-->
<!--                <el-date-picker v-model="search_data.starttime" type="datetime" start-placeholder="开始日期">-->
<!--                </el-date-picker>-->
<!--                &#45;&#45;-->
<!--                <el-date-picker v-model="search_data.endtime" type="datetime" end-placeholder="结束日期">-->
<!--                </el-date-picker>-->

<!--                <el-for-item class="btnleft">-->
<!--                                    <el-button type="primary" size="big" icon="search" @click="handleSearch()">-->
<!--                                        筛选-->
<!--                                    </el-button>-->
<!--                </el-for-item>-->
<!--                </el-from>-->



                    <el-input placeholder="按照部门筛选"
                              style="width: 300px;margin-left: 10px;"
                              clearable
                              v-model="department_data.Department" >

                    </el-input>

            <el-for-item class="btnleft">
                <el-button type="primary"
                           size="big"
                           icon="search"
                           @click="handleSearchDepartment()"
                >
                    部门筛选
                </el-button>
            </el-for-item>
                <el-for-item class="btnRight">
                    <el-button type="primary" size="big" icon="view" v-if="user.identity== 'manager'&&'admin'" @click="handleAdd()">
                                        添加
                    </el-button>
                </el-for-item>

        </div>
        <div class="table_container">
            <div class="kongbai"></div>
            <el-table
                    v-if="tableData.length > 0"
                    :data="tableData"
                    max-height="450"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="staffname"
                        label="员工姓名"
                        align="center"
                        width="190">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="部门"
                        align="center"
                        width="190">
                </el-table-column>

                <el-table-column
                        prop="position"
                        label="职位"
                        align="center"
                        width="190">
                </el-table-column>

                <el-table-column
                        prop="ptitle"
                        label="职称"
                        align="center"
                        width="190">
                </el-table-column>

                <el-table-column
                        prop="formofemployment"
                        label="聘用形式"
                        align="center"
                        width="190">
                </el-table-column>

                <el-table-column
                        prop="internshiptime"
                        label="实习时间"
                        align="center"
                        width="190">
                </el-table-column>

                <el-table-column
                        prop="workertime"
                        label="转正时间"
                        align="center"
                        width="190">
                </el-table-column>


                <el-table-column
                        prop="operation"
                        align="center"
                        fixed="right"
                        width="320"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="warning"
                                size="small"
                                icon="edit"
                                v-if="user.identity == 'manager'&&'admin'"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                v-if="user.identity == 'manager'&&'admin'"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-row>
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
        <SeniorListDialog :dialog="dialog" :formData="formData" @update="getProfile"></SeniorListDialog>
    </div>
</template>

<script>
    import SeniorListDialog from "../components/SeniorListDialog";
    export default {
        name: "SeniorList",
        data(){
            return{
                department_data:{
                    Department:''
                },
                format_department_list: [
                    "企划部",
                    "人力部",
                    "财务部",
                    "服务部",
                    "研发部",
                    "事业部"
                ],
                filtertableData:[],
                tableData:[],
                alltabledata:[],
                dialog:{
                    show:false,
                    title:'',
                    option:'edit'
                },
                formData:{
                    id:'',
                    department:'',
                    staffname:'',
                    position:'',
                    ptitle:'',
                    internshiptime:'',
                    workertime:'',
                    department:'',
                    formofemployment:''
                },
                paginations:{
                    page_index:1, //当前位于哪页
                    total:0,//当前数据总数
                    page_size:7,//一页显示多少条 //5
                    page_sizes:[5,10,20],//每页显示多少条 //5,10,15
                    layout:"total,sizes,prev,pager,next,jumper"//翻页属性
                }
            };
        },
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        components:{
            SeniorListDialog
        },
        created() {
            this.getProfile();
        },
        methods:{

            //获取表格数据
            getProfile(){
                this.$axios.get('/api/profiles')
                    .then(res =>{
                        this.alltabledata = res.data
                        this.filtertableData = res.data
                        //设置分页数据
                        this.setPaginations()

                    })
                    .catch(err=>console.log(err))
            },

            //编辑
            handleEdit(index,row){
                //编辑
                this.dialog = {
                    show:true,
                    title:"修改信息",
                    option: 'edit'
                };
                this.formData = {
                    id:row._id,
                    staffname:row.staffname,
                    position:row.position,
                    ptitle:row.ptitle,
                    internshiptime:row.internshiptime,
                    workertime:row.workertime,
                    department:row.department,
                    formofemployment:row.formofemployment
                }
            },

            //删除
            handleDelete(index,row){
                //删除
                this.$axios.delete(`api/profiles/delete/${row._id}`).then( res => {
                    this.$message('删除成功');
                })
                this.getProfile();
            },

            //添加
            handleAdd(){
                this.dialog={
                    show:true,
                    title:"添加信息",
                    option: 'add'
                };
                this.formData = {
                    id:'',
                    staffname:'',
                    position:'',
                    ptitle:'',
                    internshiptime:'',
                    workertime:'',
                    department:'',
                    formofemployment:''
                }
            },

            //分页
            setPaginations(){
                //分页属性
                this.paginations.total = this.alltabledata.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 7;
                //设置默认的分页数据
                this.tableData = this.alltabledata.filter((item,index) =>{
                    return index < this.paginations.page_size
                })
            },

            //切换size
            handleSizeChange(page_size){
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tableData = this.alltabledata.filter((item,index) =>{
                    return index < page_size
                })
            },

            //获取当前页
            handleCurrentChange(page){
                let  index = this.paginations.page_size * (page - 1);
                let nums = this.paginations.page_size * page
                let tables = [];
                for (let i = index;i<nums;i++){
                    if (this.alltabledata[i]){
                        tables.push(this.alltabledata[i])
                    }
                    this.tableData = tables;
                }
            },

            //筛选
            handleSearch(){
                if (!this.search_data.starttime || !this.search_data.endtime){
                    this.$message({
                        type:"warning",
                        message:"请选择时间区间"
                    });
                    this.getProfile()
                    return;
                }
                const stime = this.search_data.starttime.getTime()
                const etime = this.search_data.endtime.getTime()

                this.alltabledata = this.filtertableData.filter(item =>{
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                })
                //分页数据的调用
                this.setPaginations();
            },

            //部门筛选
            handleSearchDepartment(){
                if (!this.department_data.Department){
                    this.$message({
                        type: "warning",
                        message: "请填写部门"
                    });
                    this.getProfile()
                    return
                }

                const partment = this.department_data.Department

                this.alltabledata = this.filtertableData.filter(item =>{
                    let ment = item.department
                    return ment == partment
                })
                this.setPaginations();
            }
        }
    }
</script>

<style scoped>
    .kongbai{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .btnRight {
        float: right;
        margin-bottom: 10px;
    }
    .pagination {
        text-align: right;
        margin-top: 10px;
    }
    .btnleft{
        margin-left: 10px;
        margin-bottom: 10px;
    }
</style>

