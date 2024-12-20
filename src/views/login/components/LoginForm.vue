<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="电话">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="register"> 注册 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
//import { HOME_URL } from "@/config";
import { type Login } from "@/api/interface";
//import { loginApi } from "@/api/modules/login";
//import { useUserStore } from "@/stores/modules/user";
//import { useTabsStore } from "@/stores/modules/tabs";
//import { useKeepAliveStore } from "@/stores/modules/keepAlive";
//import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
// import { register } from "module";
//import md5 from "md5";
import useUserStore from "@/stores/modules/user";
import { type loginForm } from '@/api/user/type';

let useStore = useUserStore();

const router = useRouter();
// const userStore = useUserStore();
// const tabsStore = useTabsStore();
// const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: ""
});

// login
const login = () => {
    const formData = new FormData();
    formData.append('telephone', loginForm.username);
    formData.append('password', loginForm.password);
    //useStore.userLogin(formData as unknown as loginForm, router)
    useStore.userLogin(formData as unknown as loginForm, router, loginForm.username,loginForm.password)
};


// // resetForm
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };

const register = () => {
    const formData = new FormData();
    formData.append('telephone', loginForm.username);
    formData.append('password', loginForm.password);
    useStore.userRegister(formData as unknown as loginForm)
 
}

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      login();
    }
  };
});

onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="scss">
@import "../index.css";
</style>
