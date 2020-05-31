<template>
<!--    高级资料-->
    <div class="fillcontain ">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">员工资料</el-breadcrumb-item>
            <el-breadcrumb-item >高级资料</el-breadcrumb-item>
        </el-breadcrumb>

        <div v-if="user.identity == 'employee'">
            <el-button
                    plain
                    @click="open1"
            >
                您无权访问此页面
            </el-button>
        </div>
        <div>




            <el-input v-model="search_name.sname" placeholder="按照姓名筛选" style="width: 300px;" clearable v-if="user.identity == 'admin' && 'manager'"></el-input>
            <el-for-item class="btnleft" v-if="user.identity == 'admin' && 'manager'">
                <el-button type="primary" size="big" icon="search" @click="handleSearchname()">
                    姓名筛选
                </el-button>
            </el-for-item>
<!--                <el-for-item class="btnRight">-->
<!--                    <el-button type="primary" size="big" icon="view" v-if="user.identity=='admin'&&'manager'" @click="handleAdd()">-->
<!--                        添加-->
<!--                    </el-button>-->
<!--                </el-for-item>-->
            </el-from>
        </div>
        <div class="table_container" v-if="user.identity == 'admin' && 'manager'">
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
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="idnumber"
                        label="身份证号"
                        align="center"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="marriage"
                        label="婚姻状况"
                        align="center"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="politics"
                        label="政治面貌"
                        align="center"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="school"
                        label="毕业院校"
                        align="center"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="major"
                        label="专业"
                        align="center"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="contactaddress"
                        label="联系地址"
                        align="center"
                        width="180">
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
        <BasicListDialog :dialog="dialog" :formData="formData" @update="getProfile"></BasicListDialog>
    </div>
</template>

<script>
    // import DialogFound from "../components/DialogFound";
    import BasicListDialog from "../components/BasicListDialog";

    export default {
        name: "BasicList",
        data(){
            return{
                search_name:{
                    sname:''
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
                    nation:'',
                    idnumber:'',
                    marriage:'',
                    politics:'',
                    contactaddress:'',

                    major:'',
                    school:''

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
            BasicListDialog
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
                    message: h('i', { style: 'color: teal'}, '联系管理员，即可查看本页内容')
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
                    idnumber:row.idnumber,
                    marriage:row.marriage,
                    politics:row.politics,
                    contactaddress:row.contactaddress,
                    major:row.major,
                    school:row.school
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
                    marriage:'',
                    politics:'',
                    contactaddress:'',
                    major:'',
                    school:''
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

            // //筛选
            // handleSearch(){
            //     if (!this.search_data.starttime || !this.search_data.endtime){
            //         this.$message({
            //             type:"warning",
            //             message:"请选择时间区间"
            //         });
            //         this.getProfile()
            //         return;
            //     }
            //     const stime = this.search_data.starttime.getTime()
            //     const etime = this.search_data.endtime.getTime()
            //
            //     this.alltabledata = this.filtertableData.filter(item =>{
            //         let date = new Date(item.date);
            //         let time = date.getTime();
            //         return time >= stime && time <= etime;
            //     })
            //     //分页数据的调用
            //     this.setPaginations();
            // },

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
