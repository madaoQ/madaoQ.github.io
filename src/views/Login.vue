<script setup lang="ts">
import { useRouter } from 'vue-router';
import request from '@/utils/request'
import { ElMessage } from 'element-plus';
const router = useRouter();

ElMessage({
            type:'error',
            message:'hello',
            grouping: true,
        });

function login() {
    router.replace({
        name: 'MessageList',//必须用name而不是path
        params: {
        }
    })
}
function register() {
    router.push({
        name: 'Register',//必须用name而不是path
        params: {
        }
    })
}
function test() {
    request({
    url:'/user/login',
    method: 'post',
    data:{
        username:'Q',
        password:'123456'
    }
}).then((response)=>{
    console.log(response.data);
})
}
</script>


<template>
<h1>Login</h1>

<el-button type="primary" round @click="login()">登录</el-button>
<el-button type="primary" round @click="register()">注册</el-button>
<el-button type="primary" round @click="test()">测试接口</el-button>

</template>


<style scoped>

</style>