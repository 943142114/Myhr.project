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
                        label-width="120px"
                        style="margin:10px;width:auto;"
                >
                    <!--            <el-form-item label=类型:">-->
                    <!--                <el-select v-model="formData.type" placeholder="类型">-->
                    <!--                    <el-option v-for="(formtype, index) in format_type_list" :key="index"-->
                    <!--                               :label="formtype" :value="formtype"></el-option>-->
                    <!--                </el-select>-->
                    <!--            </el-form-item>-->


                    <el-form-item prop="allhrmessages" label="公告内容 ：">
                        <el-input type="allhrmessages" v-model="formData.allhrmessages"></el-input>
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
        name: "MonthendDialog",
        data(){
            return{
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
                        this.$axios.post(`/api/messages/${url}`, this.formData)
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
