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




                    <el-form-item prop="basepay" label="基本工资：">
                        <el-input type="basepay" v-model="formData.basepay"></el-input>
                    </el-form-item>

                    <el-form-item prop="jiangjin" label="奖金提成：">
                        <el-input type="jiangjin" v-model="formData.jiangjin"></el-input>
                    </el-form-item>

                    <el-form-item prop="formofemployment" label="餐补：">
                        <el-input type="formofemployment" v-model="formData.formofemployment"></el-input>
                    </el-form-item>


                    <el-form-item prop="trafficlsubsidy" label="交通补助：">
                        <el-input type="trafficlsubsidy" v-model="formData.trafficlsubsidy"></el-input>
                    </el-form-item>

                    <el-form-item prop="accumulationfund" label="公积金：">
                        <el-input type="accumulationfund" v-model="formData.accumulationfund"></el-input>
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
        name: "PenmonDialog",
        data(){
            return{
                form_rules:{
                    basepay:[{required: true, message: "基本工资不能为空！", trigger: "blur"}
                    ],
                    formofemployment:[{ required:true, message: "餐补不能为空！", trigger: "blur"}
                    ],
                    trafficlsubsidy:[{ required:true, message: "交通补助不能为空！", trigger: "blur"}
                    ],
                    jiangjin:[{ message: "奖金提成不能为空！", trigger: "blur"}
                    ],
                    accumulationfund:[{ required: true, message: "公积金不能为空！", trigger: "blur"}
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

