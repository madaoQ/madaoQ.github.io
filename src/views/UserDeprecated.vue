<!-- <template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <h1 class="text-2xl font-bold text-white text-center">用户信息</h1>
            </div>
            <div class="p-6 space-y-6">
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 font-medium">用户名</span>
                        <span class="text-gray-800">{{ username }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 font-medium">账号</span>
                        <span class="text-gray-800">{{ account }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 font-medium">密码</span>
                        <span class="text-gray-800">••••••••</span>
                    </div>
                </div>
                <button @click="showChangePassword = true"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                    修改密码
                </button>
            </div>
        </div>

         修改密码弹窗
        <div v-if="showChangePassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 class="text-xl font-bold mb-4">修改密码</h2>
                <form @submit.prevent="changePassword" class="space-y-4">
                    <div>
                        <label for="currentPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
                        <input type="password" id="currentPassword" v-model="currentPassword"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required>
                    </div>
                    <div>
                        <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
                        <input type="password" id="newPassword" v-model="newPassword"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required>
                    </div>
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button type="button" @click="showChangePassword = false"
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            取消
                        </button>
                        <button type="submit"
                            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            确认修改
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template> -->
  
<!-- <script setup lang="ts">
import { ref } from 'vue'

// 模拟用户数据
const username = ref('Q')
const account = ref('123546')

// 修改密码相关状态
const showChangePassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 修改密码方法
const changePassword = () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('新密码和确认密码不匹配')
        return
    }
    // 这里应该添加实际的密码修改逻辑，比如发送请求到服务器
    console.log('密码修改成功')
    showChangePassword.value = false
    // 重置表单
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}
</script> -->

<template>
    <div class="min-h-screen bg-gray-100">
      <!-- 页面头部 -->
      <header class="bg-white shadow-md p-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img src="@\assets\icons\shelder.svg" alt="User Avatar" class="w-10 h-10 rounded-full" />
          <span class="text-lg font-semibold">{{ username }}</span>
        </div>
        <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out">
          登出
        </button>
      </header>
  
      <!-- 主要内容区域 -->
      <main class="container mx-auto p-4 mt-4 bg-white rounded-lg shadow-lg">
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">用户名</span>
              <span class="text-gray-800">{{ username }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">账号</span>
              <span class="text-gray-800">{{ account }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">密码</span>
              <span class="text-gray-800">••••••••</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">关联账户</span>
              <span class="text-gray-800">••••••••</span>
            </div>
          </div>
          <button @click="showChangePassword = true"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            修改密码
          </button>
        </div>
      </main>
  
      <!-- 修改密码弹窗 -->
      <div v-if="showChangePassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 class="text-xl font-bold mb-4">修改密码</h2>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
              <input type="password" id="currentPassword" v-model="currentPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
              <input type="password" id="newPassword" v-model="newPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="showChangePassword = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                取消
              </button>
              <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                确认修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // 模拟用户数据
  const username = ref('Qwen')
  const account = ref('qwen@example.com')
  
  // 修改密码相关状态
  const showChangePassword = ref(false)
  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  
  // 修改密码方法
  const changePassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('新密码和确认密码不匹配')
      return
    }
    // 这里应该添加实际的密码修改逻辑，比如发送请求到服务器
    console.log('密码修改成功')
    showChangePassword.value = false
    // 重置表单
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }
  
  // 登出方法
  const logout = () => {
    // 这里应该添加实际的登出逻辑，比如清除 token、重定向到登录页等
    console.log('登出成功')
  }
  </script>
  
  <style scoped>
  /* 你可以在这里添加额外的样式 */
  </style>