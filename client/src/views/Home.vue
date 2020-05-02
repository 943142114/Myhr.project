<template>
    <div class="home">
    <div class="container">

<!--        <div class="lunbo">-->
<!--            <el-carousel indicator-position="outside" type="card" height="400px">-->
<!--                <el-carousel-item v-for="(item,index) in lunboimg" :key="index">-->
<!--                    <img :src="item.src" alt="">-->
<!--                </el-carousel-item>-->
<!--            </el-carousel>-->
<!--        </div>-->
        <p class="lead"> 专注人力资源管理，用心做服务! </p>
    </div>

    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                lunboimg:[
                    { src: require("../assets/im001.png")},
                    { src: require("../assets/im002.png")},
                    { src: require("../assets/im003.png")},
                    { src: require("../assets/im004.png")}
                ]
            }
        }
    }
</script>

<style scoped>
    .lunbo{
        width: 1450px;
        margin: 0 auto;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .home {
        width: 100%;
        height: 100%;
        background: url(../assets/showcase.png) no-repeat;
        background-size: 100% 100%;
    }
    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 50px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        color: white;
    }
    .title {
        font-size: 30px;
    }
    .lead {
        margin-top: 80px;
        font-size: 22px;
    }
</style>
