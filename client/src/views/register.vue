<template>
<div class="register">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">期待着你的到来</span>
            <el-form :model="registerUser" :rules="rules" ref="registerFrom" label-width="80px" class="registerForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                </el-form-item>

                <el-form-item label="选择身份">
                    <el-select v-model="registerUser.identity" placeholder="请选择身份">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="主管" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerFrom')">注册</el-button>
                </el-form-item>

            </el-form>
        </div>
    </section>
</div>
</template>

<script>
    export default {
        name: "register",
        data(){
            var validatorpassword2 = (rule, value, callback) => {
                 if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:""
                },
                rules:{
                    name:[{required:true,message:"用户名不能为空",trigger:"blur"},{min:2,max:30,message: "长度要到2-30个字符之间",trigger: "blur"}],
                    email:[{required:true,message:"邮箱格式不正确",trigger:"blur"}],
                    password:[{required:true,message:"密码不能为空",trigger:"blur"},{min:6,max:30,message:"长度要到6-30个字符之间",trigger:"blur"}],
                    password2:[{required:true,message:"确认密码不能为空",trigger:"blur"},
                               {min:6,max:30,message:"长度要到6-30个字符之间",trigger:"blur"},
                               {validator:validatorpassword2,trigger: "blur"}]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerUser)
                        .then(res =>{
                            this.$message({
                                message:"账号注册成功!",
                                type:"success"
                            })
                        })

                        this.$router.push('/login')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
         }
    }

</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bg.gif) no-repeat center center;
        background-size: 100% 100%;
    }
    .form_container {
        width: 370px;
        height: 210px;
        margin: 0 auto;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: black;
    }
    .manage_tip{
        padding-top: 100px;
    }
    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 10px 10px #cccc;
    }

    .submit_btn {
        margin-left: 80px;
        width: 60%;
    }
</style>
