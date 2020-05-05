<!--<template>-->
<!--    <div class="fillcontain">-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">-->
<!--            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item :to="{ path: 'home' }">统计管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item >人事信息统计</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->

<!--        <el-upload-->
<!--                class="upload-demo"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :on-change="handleChange"-->
<!--                :file-list="fileList">-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "HrStatistics",-->
<!--        data() {-->
<!--            return {-->
<!--                fileList: [{-->
<!--                    name: 'food.jpeg',-->
<!--                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'-->
<!--                }, {-->
<!--                    name: 'food2.jpeg',-->
<!--                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'-->
<!--                }]-->
<!--            };-->
<!--        },-->
<!--        methods: {-->
<!--            handleChange(file, fileList) {-->
<!--                this.fileList = fileList.slice(-3);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<template>
    <div style="margin-top:100px">
        <el-form :model="form">
            <!--            <el-form-item label="姓名" label-width="50px">-->
            <!--                <el-input v-model="form.name"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="年龄" label-width="50px">-->
            <!--                <el-input v-model="form.age"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="文件" label-width="50px">
                <el-upload
                        class="upload-demo"
                        :auto-upload="false"
                        :limit="1"
                        ref="upload"
                        :http-request="upload"
                        multiple>
                    <!-- :http-request="upload" -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
                </el-upload>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="upload">确定</el-button>
    </div>
</template>
<script>
    export default{
        name: 'upload',
        data() {
            return {
                form: {
                    name: '',
                    age: ''
                }
            }
        },
        methods: {
            upload() {
                const formData = new FormData();
                const file = this.$refs.upload.uploadFiles[0];
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
                if (!file) { // 若未选择文件
                    this.$message({
                        message:'请选择上传文件'
                    })
                    // alert('请选择文件');
                    // return;
                }
                formData.append('file', file.raw);
                formData.append('name', this.name);
                formData.append('age', this.age);
                this.$axios.post('/api/upload', formData, headerConfig).
                then(res => {
                    this.$message({
                        message: "成功！",
                        type: "success"
                    });
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
</style>

<!--<template>-->
<!--    <div style="margin-top:100px">-->
<!--        <el-form :model="form">-->
<!--&lt;!&ndash;            <el-form-item label="姓名" label-width="50px">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input v-model="form.name"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-form-item label="年龄" label-width="50px">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input v-model="form.age"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--            <el-form-item label="文件" label-width="50px">-->
<!--                <el-upload-->
<!--                        class="upload-demo"-->
<!--                        :auto-upload="false"-->
<!--                        :limit="1"-->
<!--                        ref="upload"-->
<!--                        :http-request="upload"-->
<!--                        multiple>-->
<!--                    &lt;!&ndash; :http-request="upload" &ndash;&gt;-->
<!--                    <el-button size="small" type="primary">点击上传</el-button>-->
<!--                    <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>-->
<!--                </el-upload>-->
<!--            </el-form-item>-->
<!--        </el-form>-->

<!--        <el-button type="primary" @click="upload">确定</el-button>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    export default{-->
<!--        name: 'HrStatistics',-->
<!--        data() {-->
<!--            return {-->
<!--                form: {-->
<!--                    name: '',-->
<!--                    age: ''-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            upload() {-->
<!--                const formData = new FormData();-->
<!--                const file = this.$refs.upload.uploadFiles[0];-->
<!--                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };-->
<!--                if (!file) { // 若未选择文件-->
<!--                    this.$message({-->
<!--                        message:'请选择上传文件'-->
<!--                    })-->
<!--                    // alert('请选择文件');-->
<!--                    // return;-->
<!--                }-->
<!--                formData.append('file', file.raw);-->
<!--                formData.append('name', this.name);-->
<!--                formData.append('age', this.age);-->
<!--                this.$axios.post('/api/upload', formData, headerConfig).-->
<!--                then(res => {-->
<!--                    this.$message({-->
<!--                        message: "成功！",-->
<!--                        type: "success"-->
<!--                    });-->
<!--                })-->

<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
