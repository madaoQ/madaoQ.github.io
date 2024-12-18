<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function success() {
    router.push({
        name: 'Login',//必须用name而不是path
        params: {
        }
    })
}
</script>


<template>
<h1>注册</h1>
<el-button type="primary" round @click="success()">注册成功</el-button>
</template>


<style scoped>

</style>