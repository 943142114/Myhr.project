<template>
<!--    员工账套-->
    <p v-if="user.identity !== 'employee'">欢迎来到企业账套管理CompanyAccountSet</p>
</template>

<script>
    export default {
        name: "CompanyAccountSet",
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
    }
</script>

<style scoped>

</style>
