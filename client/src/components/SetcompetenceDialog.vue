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
                    <!--            <el-form-item label=类型:">-->
                    <!--                <el-select v-model="formData.type" placeholder="类型">-->
                    <!--                    <el-option v-for="(formtype, index) in format_type_list" :key="index"-->
                    <!--                               :label="formtype" :value="formtype"></el-option>-->
                    <!--                </el-select>-->
                    <!--            </el-form-item>-->






<!--                    <el-form-item prop="identity" label="权限：">-->
<!--                        <el-input type="identity" v-model="formData.identity"></el-input>-->
<!--                    </el-form-item>-->

                    <el-form-item prop="name" label="用户名：" style="width:37.5%">
                        <el-input type="name" v-model="formData.name"></el-input>
                    </el-form-item>

                    <el-form-item label="分配权限：">
                        <el-select v-model="formData.identity" placeholder="权限">
                            <el-option
                                    v-for="(formtype, index) in format_identity_list"
                                    :key="index"
                                    :label="formtype"
                                    :value="formtype"
                            ></el-option>
                        </el-select>
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
        name: "SetcompetenceDialog",
        data(){
            return{
                format_identity_list: [
                'admin',
                'manager',
                'employee'
                ],
                form_rules:{
                    identity:[{required: true, message: "权限不能为空！", trigger: "blur"}
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
                        this.$axios.post(`/api/users/${url}`, this.formData)
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
