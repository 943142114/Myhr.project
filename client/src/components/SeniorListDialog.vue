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

                    <el-form-item label="部门：">
                        <el-select v-model="formData.department" placeholder="部门">
                            <el-option
                                    v-for="(formtype, index) in format_department_list"
                                    :key="index"
                                    :label="formtype"
                                    :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="聘用形式：">
                        <el-select v-model="formData.formofemployment" placeholder="聘用形式">
                            <el-option
                                    v-for="(formtype, index) in format_formofemployment_list"
                                    :key="index"
                                    :label="formtype"
                                    :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item prop="position" label="职位：">
                        <el-input type="position" v-model="formData.position"></el-input>
                    </el-form-item>

                    <el-form-item prop="ptitle" label="职称：">
                        <el-input type="ptitle" v-model="formData.ptitle"></el-input>
                    </el-form-item>

                    <el-form-item prop="internshiptime" label="实习时间：">
                        <el-input type="internshiptime" v-model="formData.internshiptime"></el-input>
                    </el-form-item>

                    <el-form-item prop="workertime" label="转正时间：">
                        <el-input type="workertime" v-model="formData.workertime"></el-input>
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
        name: "SeniorListDialog",
        data(){
            return{
                format_department_list: [
                    "企划部",
                    "人力部",
                    "财务部",
                    "服务部",
                    "研发部",
                    "事业部"
                ],
                format_formofemployment_list:[
                    "社会招聘",
                    "校园招聘",
                    "内部推荐"
                ],
                form_rules:{
                    position:[{required: true, message: "职位不能为空！", trigger: "blur"}
                    ],
                    ptitle:[{message: "职称不能为空！", trigger: "blur"}
                    ],
                    internshiptime:[{required: true, message: "实习时间不能为空！", trigger: "blur"}
                    ],
                    workertime:[{ message: "转正不能为空！", trigger: "blur"}
                    ]
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
