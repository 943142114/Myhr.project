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
                        style="margin:10px;width:auto;">

                    <el-form-item prop="staffname" label="员工姓名：">
                        <el-input type="staffname" v-model="formData.staffname"></el-input>
                    </el-form-item>

                    <el-form-item prop="staffsex" label="员工性别：">
                        <el-input type="staffsex" v-model="formData.staffsex"></el-input>
                    </el-form-item>

                    <el-form-item prop="nation" label="民族：">
                        <el-input type="nation" v-model="formData.nation"></el-input>
                    </el-form-item>

                    <el-form-item prop="staffBirthday" label="出生日期：">
                        <el-input type="staffBirthday" v-model="formData.staffBirthday"></el-input>
                    </el-form-item>

                    <el-form-item prop="phonenumber" label="联系电话：">
                        <el-input type="phonenumber" v-model="formData.phonenumber"></el-input>
                    </el-form-item>

                    <el-form-item prop="department" label="部门：">
                        <el-input type="department" v-model="formData.department"></el-input>
                    </el-form-item>

                    <el-form-item prop="position" label="职位：">
                        <el-input type="position" v-model="formData.position"></el-input>
                    </el-form-item>

                    <el-form-item prop="ptitle" label="职称：">
                        <el-input type="ptitle" v-model="formData.ptitle"></el-input>
                    </el-form-item>

                    <el-form-item prop="education" label="聘用形式：">
                        <el-input type="education" v-model="formData.education"></el-input>
                    </el-form-item>

                    <el-form-item prop="internshiptime" label="实习时间：">
                        <el-input type="internshiptime" v-model="formData.internshiptime"></el-input>
                    </el-form-item>

                    <el-form-item prop="workertime" label="转正时间：">
                        <el-input type="workertime" v-model="formData.workertime"></el-input>
                    </el-form-item>

                    <el-form-item prop="idnumber" label="身份证号：">
                        <el-input type="idnumber" v-model="formData.idnumber"></el-input>
                    </el-form-item>

                    <el-form-item prop="marriage" label="婚姻状况：">
                        <el-input type="marriage" v-model="formData.marriage"></el-input>
                    </el-form-item>

                    <el-form-item prop="politics" label="政治面貌：">
                        <el-input type="politics" v-model="formData.politics"></el-input>
                    </el-form-item>

                    <el-form-item prop="school" label="毕业院校：">
                        <el-input type="school" v-model="formData.school"></el-input>
                    </el-form-item>

                    <el-form-item prop="major" label="专业：">
                        <el-input type="major" v-model="formData.major"></el-input>
                    </el-form-item>

                    <el-form-item prop="contactaddress" label="联系地址：">
                        <el-input type="contactaddress" v-model="formData.contactaddress"></el-input>
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
        name: "ComprehensiveDialog",
        data(){
            return{
                // form_rules:{
                //     // idnumber:[{message: "身份证号不能为空！", trigger: "blur"}
                //     // ],
                //     // marriage:[{message: "婚姻状态不能为空！", trigger: "blur"}
                //     // ],
                //     // politics:[{ message: "政治面貌不能为空！", trigger: "blur"}
                //     // ],
                //     // contactaddress:[{message: "联系地址不能为空！", trigger: "blur"}
                //     // ],
                //     // major:[{message: "专业不能为空！", trigger: "blur"}
                //     // ],
                //     // school:[{message: "学校不能为空！", trigger: "blur"}
                //     // ],
                //     // staffname:[{message: "姓名不能为空！", trigger: "blur"}
                //     // ],
                // }
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
