<style scoped>
@import "./index.css";
</style>
<template>
  <div class="login-container min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="login-box bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-around w-full max-w-6xl p-0 lg:p-8 relative">
      <SwitchDark class="dark absolute top-3 right-3 lg:top-5 lg:right-5" />
      <div class="login-left hidden lg:block lg:w-1/2 xl:w-2/3 p-4">
        <img class="login-left-img w-full h-auto max-h-[500px] object-contain" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form w-full lg:w-1/2 xl:w-1/3 bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-xl m-4 lg:m-0">
        <div class="login-logo flex items-center justify-center mb-8">
          <img class="login-icon w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14" src="@/assets/icons/shelder.svg" alt="" />
          <h2 class="logo-text text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 ml-3 sm:ml-4 md:ml-6 whitespace-nowrap">反诈骗</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
// import SwitchDark from "@/components/SwitchDark/index.vue";
</script>


