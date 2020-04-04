<template>
    <div class="fillcontain ">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'home' }">人事管理</el-breadcrumb-item>
            <el-breadcrumb-item >在线聊天</el-breadcrumb-item>
        </el-breadcrumb>
        <div>欢迎登录！{{user.name}}</div>

        <input type="text" v-model="msg">
        <button @click="sendata">发送</button>
        <div>{{fadatamsg}}</div>

    </div>

</template>

<script>

    //v-text  v-model
    export default {
        name: "Char",
        data(){
            return{
                msg:'',
                fadatamsg:''
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },

        //在挂载vue时就加载mounted
        mounted() {
            socket.on('notcie',function (iofo) {
                console.log('服务端'+iofo)
            }),

            //我就是那个新名字  用来接收服务端发来的东西
            socket.on('fad',ms =>{
                this.fadatamsg = ms.msg
            })
        },

        //vue页面中使用到的方法
        methods:{
            sendata(){
                //得到客户端要发的消息
                socket.emit('senddata', {
                    msg:this.msg
                })
            }
        }
    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .btn1{
        width: 60px;
        height: 22px;
        margin-left: 430px;
        margin-top: -40px;
        position: absolute;
    }
    .btn1:hover{
        background: #129611;
        color: #fff;
        border: 1px solid #129611;
    }
    .chuangkou1{
        width: 504px;
        height: 400px;
        border: 1px solid black;
    }
    .chat{
        width: 500px;
        height: 800px;
        margin-left: 700px;
    }
    .text01{
        width: 500px;
        height: 100px;
    }
</style>




<!--<template>-->
<!--    <div>-->
<!--        <audio id="biu" src="static/biu.wav"></audio>-->
<!--        <div class="chat_box">-->
<!--            <div class="panel_left">-->
<!--                <div class="left_bar">-->
<!--                </div>-->
<!--                <div class="online_box" @click="morebox_show=0,feedback_show=0">-->
<!--                    <div class="search_box">-->
<!--                        <div class="search_bar">-->
<!--                            <input type="text" placeholder="搜索" @focus="search" @focusout="search_flag=0" :class="{'focus':search_flag}" v-model="search_text"/>-->
<!--                            <div class="search_icon"></div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <ul class="online_list">-->
<!--                        <li v-for="(item,index) in filterName" @click="chooseChat(index)" :class="[{'top':index==0},{'current':currentChat==index}]">-->
<!--                            <div class="info">-->
<!--                                <div class="user_info">-->
<!--                                    <div class="user_name"></div>-->
<!--                                    <div class="user_msg"></div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="other">-->
<!--                                <div class="time">{{item.usermsg.time}}</div>-->
<!--                            </div>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="panel_right" @click="feedback_show=0">-->
<!--                <div class="chatTitle_bar">-->
<!--                    <div class="title">{{chat_title}}</div>-->
<!--                 -->
<!--                    <div class="notice" v-show="notice">{{notice}}</div>-->
<!--                </div>-->


<!--                <div class="msg_box" id="msgbox">-->
<!--                    <div>-->
<!--                        <div class="msg_body">-->
<!--                            <div class="name"><span></span></div>-->
<!--                            <div class="text"></div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div :class="['send_box',{'focus':write_flag}]">-->
<!--                    <textarea v-model="myMsg" class="text_box" @focus="write_flag=1" @focusout="write_flag=0" placeholder="请输入内容"></textarea>-->
<!--                    <div class="send_btn" @click="send_msg">发送</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->


<!--    export default {-->
<!--        name: 'char',-->
<!--        data () {-->
<!--            return {-->

<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
<!--    .clear {-->
<!--        clear: both;-->
<!--    }-->
<!--    .chat_box {-->
<!--        width: 900px;-->
<!--        height: 640px;-->
<!--        overflow: hidden;-->
<!--        border-radius: 4px;-->
<!--        background: #f5f5f5;-->
<!--        position: absolute;-->
<!--        top: 50%;-->
<!--        left: 50%;-->
<!--        transform: translate(-50%,-50%);-->
<!--        -webkit-transform: translate(-50%,-50%);-->
<!--        box-shadow: 0 0 10px 0px #999;-->
<!--    }-->
<!--    .panel_left {-->
<!--        width: 310px;-->
<!--        height: 100%;-->
<!--        float: left;-->
<!--        background: #ebe9e8;-->
<!--    }-->
<!--    .panel_left .left_bar {-->
<!--        width: 60px;-->
<!--        height: 100%;-->
<!--        background: #2c2726;-->
<!--        float: left;-->
<!--        position: relative;-->
<!--    }-->
<!--    .online_box {-->
<!--        float: right;-->
<!--        width: 250px;-->
<!--        height: 100%;-->
<!--    }-->
<!--    .online_box .search_box {-->
<!--        width: 100%;-->
<!--        height: 62px;-->
<!--        background: #eeeae8;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--    .panel_right {-->
<!--        width: 590px;-->
<!--        height: 100%;-->
<!--        float: right;-->
<!--    }-->
<!--    .chatTitle_bar {-->
<!--        width: 100%;-->
<!--        height: 62px;-->
<!--        border-bottom: 1px solid #e1e1e1;-->
<!--        position: relative;-->
<!--    }-->
<!--    .chatTitle_bar .title {-->
<!--        float: left;-->
<!--        font-size: 20px;-->
<!--        margin-top: 24px;-->
<!--        margin-left: 30px;-->
<!--    }-->
<!--    .current_head {-->
<!--        width: 35px;-->
<!--        height: 35px;-->
<!--        background: #ccc;-->
<!--        margin: 20px auto 21px;-->
<!--    }-->
<!--    .icon_list {-->
<!--        width: 35px;-->
<!--        margin: 0 auto;-->
<!--    }-->
<!--    .icon_list li {-->
<!--        margin-bottom: 10px;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .left_bar .more {-->
<!--        width: 35px;-->
<!--        height: 35px;-->
<!--        position: absolute;-->
<!--        bottom: 7px;-->
<!--        left: 12px;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .left_bar .more span {-->
<!--        width: 16px;-->
<!--        height: 1px;-->
<!--        background: #7e7e7f;-->
<!--        display: block;-->
<!--        margin: 0 auto 5px;-->
<!--    }-->
<!--    .left_bar .more span:nth-child(1) {-->
<!--        margin-top: 10px;-->
<!--    }-->
<!--    .search_bar {-->
<!--        width: 226px;-->
<!--        height: 25px;-->
<!--        margin: 25px auto 0;-->
<!--        position: relative;-->
<!--    }-->
<!--    .search_bar>* {-->
<!--        background: #e5e2e2;-->
<!--        box-sizing: border-box;-->
<!--        border: 1px solid #c7c7c7;-->
<!--        height: 100%;-->
<!--    }-->
<!--    .search_bar input {-->
<!--        width: 190px;-->
<!--        outline: none;-->
<!--        font-size: 12px;-->
<!--        padding-left: 2px;-->
<!--        float: left;-->
<!--    }-->
<!--    .search_bar .search_icon {-->
<!--        width: 25px;-->
<!--        position: absolute;-->
<!--        top: 0;-->
<!--        right: 36px;-->

<!--        background-size: 100% 100%;-->
<!--        border: none;-->
<!--    }-->
<!--    .search_bar .focus {-->
<!--        background: #f2efee;-->
<!--    }-->
<!--    .search_bar .add {-->
<!--        width: 25px;-->
<!--        height: 25px;-->
<!--        float: right;-->
<!--        cursor: pointer;-->
<!--        text-align: center;-->
<!--        line-height: 22px;-->
<!--        font-weight: lighter;-->
<!--        font-size: 22px;-->
<!--        color: #666;-->
<!--    }-->
<!--    .online_list {-->
<!--        width: 100%;-->
<!--        height: 578px;-->
<!--        overflow: auto;-->
<!--    }-->
<!--    .online_list li {-->
<!--        width: 100%;-->
<!--        height: 64px;-->
<!--        padding: 12px;-->
<!--        box-sizing: border-box;-->
<!--        position: relative;-->
<!--    }-->
<!--    .online_list .current {-->
<!--        background: #c9c9c9;-->
<!--    }-->
<!--    .online_list .current:hover {-->
<!--        background: #c9c9c9;-->
<!--    }-->
<!--    .online_list li:hover {-->
<!--        background: #d8d8d8;-->
<!--    }-->
<!--    .online_list li .info {-->
<!--        width: 184px;-->
<!--        height: 40px;-->
<!--        float: left;-->
<!--    }-->
<!--    .online_list li .other {-->
<!--        width: 40px;-->
<!--        height: 40px;-->
<!--        float: right;-->
<!--        position: absolute;-->
<!--        right: 12px;-->
<!--    }-->
<!--    .online_list li .time {-->
<!--        width: 100%;-->
<!--        font-size: 12px;-->
<!--        color: #aaa;-->
<!--        text-align: right;-->
<!--    }-->
<!--    .online_list li .info .user_head {-->
<!--        width: 40px;-->
<!--        height: 40px;-->
<!--        float: left;-->
<!--        position: relative;-->
<!--    }-->
<!--    .online_list li .info .user_info {-->
<!--        width: 144px;-->
<!--        height: 40px;-->
<!--        font-size: 14px;-->
<!--        float: right;-->
<!--        color: #111;-->
<!--        padding-left: 10px;-->
<!--        box-sizing: border-box;-->
<!--    }-->
<!--    .online_list li .info .user_msg {-->
<!--        overflow: hidden;-->
<!--        text-overflow:ellipsis;-->
<!--        white-space: nowrap;-->
<!--        font-size: 12px;-->
<!--        margin-top: 4px;-->
<!--        color: #999;-->
<!--    }-->
<!--    .panel_right .msg_box {-->
<!--        width: 100%;-->
<!--        height: 432px;-->
<!--    }-->
<!--    .panel_right .send_box {-->
<!--        width: 100%;-->
<!--        height: 145px;-->
<!--        border-top: 1px solid #e1e1e1;-->
<!--        background: #f5f5f5;-->
<!--        position: relative;-->
<!--    }-->
<!--    .panel_right .send_box .top_bar {-->
<!--        width: 100%;-->
<!--        height: 40px;-->
<!--        padding: 14px 0 0 30px;-->
<!--        box-sizing: border-box;-->
<!--        position: relative;-->
<!--    }-->

<!--    .panel_right .send_box .text_box {-->
<!--        width: 554px;-->
<!--        height: 68px;-->
<!--        margin-left: 30px;-->
<!--        outline: none;-->
<!--        resize:none;-->
<!--        font-size: 14px;-->
<!--        border: none;-->
<!--        background: none;-->
<!--    }-->
<!--    .panel_right .focus {-->
<!--        background: #fff;-->
<!--    }-->
<!--    .panel_right .send_box .send_btn {-->
<!--        width: 68px;-->
<!--        height: 25px;-->
<!--        background: #f5f5f5;-->
<!--        border: 1px solid #e1e1e1;-->
<!--        font-size: 14px;-->
<!--        color: #666;-->
<!--        text-align: center;-->
<!--        line-height: 25px;-->
<!--        position: absolute;-->
<!--        right: 30px;-->
<!--        bottom: 10px;-->
<!--        border-radius: 2px;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .panel_right .send_box .send_btn:hover {-->
<!--        background: #129611;-->
<!--        color: #fff;-->
<!--        border: 1px solid #129611;-->
<!--    }-->
<!--    .panel_right .msg_box {-->
<!--        padding: 0 30px;-->
<!--        box-sizing: border-box;-->
<!--        overflow: auto;-->
<!--    }-->
<!--    .panel_right .msg_box .other_msg {-->
<!--        float: left;-->
<!--        width: 350px;-->
<!--        margin-top: 12px;-->
<!--    }-->
<!--    .panel_right .msg_box .other_msg .the_head {-->
<!--        width: 36px;-->
<!--        height: 36px;-->
<!--        margin-top: 4px;-->
<!--        float: left;-->
<!--    }-->
<!--    .msg_box>div:last-child {-->
<!--        margin-bottom: 12px;-->
<!--    }-->
<!--    .msg_box .other_msg .msg_body {-->
<!--        float: left;-->
<!--        max-width: 304px;-->
<!--        margin-left: 10px;-->
<!--    }-->
<!--    .msg_box .other_msg .msg_body .name {-->
<!--        font-size: 12px;-->
<!--        color: #999;-->
<!--        width: 20px;-->
<!--        white-space: nowrap;-->
<!--    }-->
<!--    .msg_box .other_msg .msg_body .text {-->
<!--        margin-top: 4px;-->
<!--        font-size: 14px;-->
<!--        color: #111;-->
<!--        background: #fff;-->
<!--        padding: 8px;-->
<!--        box-sizing: border-box;-->
<!--        border: 1px solid #e6e6e6;-->
<!--        border-radius: 2px;-->
<!--    }-->
<!--    .panel_right .msg_box .my_msg {-->
<!--        float: right;-->
<!--    }-->
<!--    .panel_right .msg_box .my_msg .the_head {-->
<!--        float: right;-->
<!--    }-->
<!--    .msg_box .my_msg .msg_body {-->
<!--        float: right;-->
<!--        margin-right: 10px;-->
<!--        margin-left: 0;-->
<!--    }-->
<!--    .msg_box .my_msg .msg_body .name {-->
<!--        width: 100%;-->
<!--        float: right;-->
<!--        text-align: right;-->
<!--    }-->
<!--    .msg_box .my_msg .msg_body .text {-->
<!--        float: right;-->
<!--        background: #9eea6a;-->
<!--    }-->
<!--    .facebox {-->
<!--        width: 400px;-->
<!--        height: 200px;-->
<!--        position: absolute;-->
<!--        top: -200px;-->
<!--        left: 0;-->
<!--        background: #ccc;-->
<!--    }-->
<!--    .fubiao {-->
<!--        width: 10px;-->
<!--        height: 10px;-->
<!--        border-radius: 50%;-->
<!--        position: absolute;-->
<!--        background: #ff3b30;-->
<!--        right: -5px;-->
<!--        top: -5px;-->
<!--    }-->
<!--    .online_list .top {-->
<!--        background: #dedede;-->
<!--    }-->
<!--    .more_record {-->
<!--        text-align: center;-->
<!--        font-size: 12px;-->
<!--        color: #2c90ff;-->
<!--        margin-top: 6px;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .left_bar .more_box {-->
<!--        width: 134px;-->
<!--        height: 92px;-->
<!--        background: #323232;-->
<!--        position: absolute;-->
<!--        z-index: 1000;-->
<!--        left: 59px;-->
<!--        bottom: 14px;-->

<!--    }-->
<!--    .left_bar .more_box>div {-->
<!--        width: 100%;-->
<!--        height: 46px;-->
<!--        color: #8c8c8c;-->
<!--        font-size: 14px;-->
<!--        line-height: 46px;-->
<!--        padding-left: 12px;-->
<!--        box-sizing: border-box;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .left_bar .more_box>div:hover {-->
<!--        background: #3c3c3c;-->
<!--    }-->
<!--    .feedback {-->
<!--        width: 360px;-->
<!--        height: 250px;-->
<!--        background: #f5f5f5;-->
<!--        box-shadow: 0 0 8px 0px #d3d3d3;-->
<!--        z-index: 10;-->
<!--        position: absolute;-->
<!--        top: 50%;-->
<!--        left: 50%;-->
<!--        transform: translate(-50%,-50%);-->
<!--        -webkit-transform: translate(-50%,-50%);-->
<!--        border-radius: 2px;-->
<!--        border: 1px solid #ccc;-->
<!--    }-->
<!--    .feedback .top_bar {-->
<!--        width: 100%;-->
<!--        height: 40px;-->
<!--        box-sizing: border-box;-->
<!--    }-->
<!--    .feedback .top_bar .title {-->
<!--        float: left;-->
<!--        font-size: 12px;-->
<!--        margin-left: 12px;-->
<!--        line-height: 40px;-->
<!--        color: #333;-->
<!--    }-->
<!--    .feedback .close>span {-->
<!--        width: 10px !important;-->
<!--    }-->
<!--    .feedback .feedbacktext {-->
<!--        width: 338px;-->
<!--        height: 150px;-->
<!--        margin: 0 auto;-->
<!--        outline: none;-->
<!--        resize:none;-->
<!--        font-size: 14px;-->
<!--        border: 1px solid #dcdcdc;-->
<!--        background: #fff;-->
<!--        display: block;-->
<!--        padding: 24px 16px;-->
<!--        box-sizing: border-box;-->
<!--    }-->
<!--    .feedback .btn_group {-->
<!--        width: 150px;-->
<!--        height: 26px;-->
<!--        margin-top: 16px;-->
<!--        margin-left: 200px;-->
<!--    }-->
<!--    .feedback .btn_group>div {-->
<!--        float: left;-->
<!--        width: 70px;-->
<!--        height: 100%;-->
<!--        background: #fff;-->
<!--        font-size: 14px;-->
<!--        text-align: center;-->
<!--        line-height: 26px;-->
<!--        color: #666;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .feedback .btn_group .back {-->
<!--        float: right;-->
<!--        border: 1px solid #dcdcdc;-->
<!--    }-->
<!--    .feedback .btn_group .back:hover {-->
<!--        background: #f5f5f5;-->
<!--    }-->
<!--    .feedback .btn_group .sure {-->
<!--        background: #87d087;-->
<!--        color: #fff;-->
<!--    }-->
<!--    .feedback .btn_group .sure2 {-->
<!--        background: #1aad19;-->
<!--    }-->
<!--    .feedback .close span {-->
<!--        width: 10px !important;-->
<!--        height: 2px;-->
<!--        background: #777;-->
<!--    }-->
<!--    .feedback .close:hover span {-->
<!--        background: #fff;-->
<!--    }-->
<!--    .sendEmpty {-->
<!--        width: 114px;-->
<!--        height: 34px;-->
<!--        background: #fff;-->
<!--        border: 1px solid #ccc;-->
<!--        border-radius: 4px;-->
<!--        font-size: 12px;-->
<!--        text-align: center;-->
<!--        line-height: 34px;-->
<!--        position: absolute;-->
<!--        right: 12px;-->
<!--        bottom: 46px;-->
<!--        box-shadow: 0 2px 4px 0px #d3d3d3;-->
<!--    }-->
<!--    .sendEmpty:after {-->
<!--        content: "";-->
<!--        width: 8px;-->
<!--        height: 8px;-->
<!--        background: #fff;-->
<!--        transform: rotate(45deg);-->
<!--        -webkit-transform: rotate(45deg);-->
<!--        position: absolute;-->
<!--        bottom: -5px;-->
<!--        right: 20px;-->
<!--        border-right: 1px solid #ccc;-->
<!--        border-bottom: 1px solid #ccc;-->
<!--        box-shadow: 2px 2px 2px 0px #d3d3d3;-->
<!--    }-->
<!--    .notice {-->
<!--        width: 200px;-->
<!--        height: 20px;-->
<!--        background: #d4d4d4;-->
<!--        position: absolute;-->
<!--        left: 50%;-->
<!--        margin-left: -100px;-->
<!--        top:  29px;-->
<!--        font-size: 12px;-->
<!--        border-radius: 16px;-->
<!--        color: #fff;-->
<!--        text-align: center;-->
<!--        line-height: 20px;-->
<!--    }-->
<!--</style>-->
