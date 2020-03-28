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

                    <el-form-item prop="handlepeople" label="经办人：">
                        <el-input type="handlepeople" v-model="formData.handlepeople"></el-input>
                    </el-form-item>

                    <el-form-item prop="Remarks" label="摘要：">
                        <el-input type="Remarks" v-model="formData.Remarks"></el-input>
                    </el-form-item>

                    <el-form-item prop="income" label="收入：">
                        <el-input type="income" v-model="formData.income"></el-input>
                    </el-form-item>

                    <el-form-item prop="expenditure" label="支出：">
                        <el-input type="expenditure" v-model="formData.expenditure"></el-input>
                    </el-form-item>

                    <el-form-item prop="two" label="备注：">
                        <el-input type="two" v-model="formData.two"></el-input>
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
        name: "CompanyDialog",
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
                    income:[{required: true, message: "收入不能为空！", trigger: "blur"}
                    ],
                    handlepeople:[{required: true, message: "经办人不能为空！", trigger: "blur"}
                    ],
                    expenditure:[{required: true, message: "支出不能为空！", trigger: "blur"}
                    ],
                    Remarks:[{required: true, message: "摘要不能为空！", trigger: "blur"}
                    ],
                    two:[{ message: "备注不能为空！", trigger: "blur"}
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
                        this.$axios.post(`/api/accounts/${url}`, this.formData)
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

