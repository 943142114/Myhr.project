<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">欢迎登陆系统</span>
                <el-form :model="loginUser" :rules="rules" ref="loginFrom" label-width="80px" class="loginForm">


                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginFrom')">登录</el-button>
                    </el-form-item>
                    <div class="tiparer">
                        <p>还没有账号？现在去
                            <router-link to="/register">注册</router-link>
                        </p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode';

    export default {
        name: "login",
        data() {
            return {
                loginUser: {
                    email: "",
                    password: "",
                },
                rules: {
                    email: [{required: true, message: "邮箱格式不正确", trigger: "blur"}],
                    password: [{required: true, message: "密码不能为空", trigger: "blur"}, {
                        min: 6,
                        max: 30,
                        message: "长度要到6-30个字符之间",
                        trigger: "blur"
                    }],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login", this.loginUser)
                            .then(res => {
                                //拿到token
                                // console.log(res)
                                const {token} = res.data;
                                localStorage.setItem('eletoken', token);

                                //解析token  拿到token里的数据
                                const decoded = jwt_decode(token)

                                //token 存储到vuex中
                                this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
                                this.$store.dispatch("setuser", decoded);

                                this.$router.push('/index');

                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }

</script>

<style scoped>
    .login {
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

    .manage_tip {
        padding-top: 100px;
    }

    .loginForm {
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

    .tiparer {
        text-align: right;
        font-size: 12px;
        color: #333333;
    }

    .tiparer p a {
        color: #409eff;
    }

    .tiparer p a:hover {
        color: red;
    }
</style>
