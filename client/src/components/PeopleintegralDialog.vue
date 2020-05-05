<template>
    <div class="DialogFound">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :modal-append-to-body="false"
        >
            <div class="form">
                <el-form
                        ref="form"
                        :model="formData"
                        :rules="form_rules"
                        label-width="120px"
                        style="margin:10px;width:auto;"
                >


                    <el-form-item prop="idnumber" label="身份证号：">
                        <el-input type="idnumber" v-model="formData.idnumber"></el-input>
                    </el-form-item>

                    <el-form-item prop="employeepoints" label="员工积分：">
                        <el-input type="employeepoints" v-model="formData.employeepoints"></el-input>
                    </el-form-item>

                    <el-form-item prop="employeepointsmark" label="员工积分备注：">
                        <el-input type="employeepointsmark" v-model="formData.employeepointsmark"></el-input>
                    </el-form-item>



                    <el-form-item class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PeopleintegralDialog",
        data(){
            return{
                // format_type_list: [
                // '提现',
                // '提现手续费',
                // '充值',
                // '优惠券',
                // '充值礼券',
                // '转账'
                // ],
                form_rules:{
                    // staffnumber:[{required: true, message: "编号不能为空！", trigger: "blur"}
                    // ],
                    // staffname:[{required: true, message: "姓名不能为空！", trigger: "blur"}
                    // ],
                    // staffsex:[{required: true, message: "性别不能为空！", trigger: "blur"}
                    // ],
                    // staffBirthday:[{required: true, message: "出生日期不能为空！", trigger: "blur"}
                    // ],
                    // nation:[{required: true, message: "民族不能为空！", trigger: "blur"}
                    // ],
                    // phonenumber:[{required: true, message: "联系电话不能为空！", trigger: "blur"}
                    // ]
                    // idnumber:[{required: true, message: "身份证号不能为空！", trigger: "blur"}
                    // ],
                    // marriage:[{required: true, message: "婚姻状态不能为空！", trigger: "blur"}
                    // ],
                    // politics:[{required: true, message: "政治面貌不能为空！", trigger: "blur"}
                    // ],
                    // contactaddress:[{required: true, message: "联系地址不能为空！", trigger: "blur"}
                    // ],
                    // major:[{required: true, message: "专业不能为空！", trigger: "blur"}
                    // ],
                    // school:[{required: true, message: "学校不能为空！", trigger: "blur"}
                    // ],
                    // staffname:[{required: true, message: "姓名不能为空！", trigger: "blur"}
                    // ],
                }
            };
        },
        props:{
            dialog:Object,
            formData:Object
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        // 表单数据验证完成之后，提交数据;
                        const url =
                            this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
                        this.$axios.post(`/api/profiles/${url}`, this.formData)
                            .then(res => {
                                // 操作成功
                                this.$message({
                                    message: "成功！",
                                    type: "success"
                                });
                                //隐藏对话框
                                this.dialog.show = false;
                                this.$emit("update");
                            });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
