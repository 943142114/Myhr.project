<template>
    <!--    高级资料-->
    <div class="fillcontain ">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">工资管理</el-breadcrumb-item>
            <el-breadcrumb-item >员工账套</el-breadcrumb-item>
        </el-breadcrumb>

        <div>
<!--            <el-input v-model="search_name.sname" placeholder="按照姓名筛选" style="width: 300px;" clearable></el-input>-->
<!--            <el-for-item class="btnleft">-->
<!--                <el-button type="primary" size="big" icon="search" @click="handleSearchname()">-->
<!--                    姓名筛选-->
<!--                </el-button>-->
<!--            </el-for-item>-->
<!--            <br>-->
<!--            <br>-->
            <el-input v-model="search_department.sdepartment" placeholder="按照部门筛选" style="width: 300px;" clearable></el-input>
            <el-for-item class="btnleft">
                <el-button type="primary" size="big" icon="search" @click="handleSearchdepartment()">
                    部门筛选
                </el-button>
            </el-for-item>

            <el-for-item class="btnRight">
                <el-button type="primary" size="big" icon="view" v-if="user.identity=='admin'&&'manager'" @click="handleAdd()">
                    添加
                </el-button>
            </el-for-item>
            </el-from>
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
                        prop="staffname"
                        label="员工姓名"
                        align="center"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="department"
                        label="部门"
                        align="center"
                        width="200">
                </el-table-column>


                <el-table-column
                        prop="basepay"
                        label="基本工资"
                        align="center"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="jiangjin"
                        label="奖金提成"
                        align="center"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="formofemployment"
                        label="餐补"
                        align="center"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="trafficlsubsidy"
                        label="交通补助"
                        align="center"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="accumulationfund"
                        label="公积金"
                        align="center"
                        width="200">
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
                                v-if="user.identity=='employee'"
                                @click="open1">无权操作</el-button>

                        <el-button
                                type="warning"
                                size="small"
                                icon="edit"
                                v-if="user.identity=='admin'&&'manager'"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                v-if="user.identity=='admin'&&'manager'"
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
        <!--        <DialogFound :dialog="dialog" :formData="formData" @update="getProfile"></DialogFound>-->
        <PeomonDialog :dialog="dialog" :formData="formData" @update="getProfile"></PeomonDialog>
    </div>
</template>

<script>

    import PeomonDialog from "../components/PeomonDialog";

    export default {
        name: "BasicList",
        data(){
            return{
                search_name:{
                    sname:''
                },
                search_department:{
                    sdepartment:''
                },
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
                    staffname:'',
                    idnumber:'',
                    jiangjin:'',
                    department:'',
                    basepay:'',
                    formofemployment:'',
                    trafficlsubsidy:'',
                    accumulationfund:''

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
            PeomonDialog
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
            open1() {
                const h = this.$createElement;

                this.$notify({
                    title: '您没有权限',
                    message: h('i', { style: 'color: teal'}, '请联系管理员，稍后进行重试')
                });
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
                    id: row._id,
                    staffname:row.staffname,
                    jiangjin:row.jiangjin,
                    idnumber:row.idnumber,
                    department:row.department,
                    basepay:row.basepay,
                    formofemployment:row.formofemployment,
                    trafficlsubsidy:row.trafficlsubsidy,
                    accumulationfund:row.accumulationfund
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
                    id: '',
                    staffname:'',
                    idnumber:'',
                    jiangjin:'',
                    department:'',
                    basepay:'',
                    formofemployment:'',
                    trafficlsubsidy:'',
                    accumulationfund:''

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


            //按照姓名筛选
            handleSearchname(){
                if (!this.search_name.sname){
                    this.$message({
                        type: 'warning',
                        message: "请填写姓名"
                    });
                    this.getProfile()
                    return;
                }
                const sname = this.search_name.sname
                this.alltabledata = this.filtertableData.filter(item =>{
                    // console.log(item)
                    let name = item.staffname
                    return name == sname
                })
                this.setPaginations();
            },

            handleSearchdepartment(){
                if (!this.search_department.sdepartment){
                    this.$message({
                        type: 'warning',
                        message: "请填写部门"
                    });
                    this.getProfile()
                    return;
                }
                const sdepartment = this.search_department.sdepartment
                this.alltabledata = this.filtertableData.filter(item =>{
                    // console.log(item)
                    let department = item.department
                    return department == sdepartment
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

