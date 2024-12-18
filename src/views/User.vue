<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center  p-4">
      <!-- 圆形头像 -->
      <img src="@\assets\icons\shelder.svg" alt="User Avatar" class="w-24 h-24 rounded-full mb-6 mt-6" />
  
      <!-- 用户信息卡片 -->
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden mt-4">
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
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">关联账户：</span>
            </div>
          </div>
  
          <!-- 关联账户手风琴组件 -->
          <Accordion :items="linkedAccounts" @remove="removeAccount" />
          
          <!-- 添加关联账户按钮 -->
          <button @click="showAddAccount = true"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            添加关联账户
          </button>
  
          <!-- 修改密码按钮 -->
          <button @click="showChangePassword = true"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            修改密码
          </button>
  
          <!-- 登出按钮 -->
          <button @click="logout"
            class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            登出
          </button>
        </div>
      </div>
  
      <!-- 修改密码弹窗 -->
      <div v-if="showChangePassword || showAddAccount" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 class="text-xl font-bold mb-4">{{ showAddAccount ? '添加关联账户' : '修改密码' }}</h2>
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div v-if="!showAddAccount">
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
              <input type="password" id="currentPassword" v-model="currentPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div>
              <label :for="showAddAccount ? 'newAccount' : 'newPassword'" class="block text-sm font-medium text-gray-700">
                {{ showAddAccount ? '新账户' : '新密码' }}
              </label>
              <input :type="showAddAccount ? 'text' : 'password'" :id="showAddAccount ? 'newAccount' : 'newPassword'"
                v-model="newEntry"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div v-if="!showAddAccount">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required>
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                取消
              </button>
              <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                确认
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Accordion from '@/components/Accordion.vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();
  // 模拟用户数据
  const username = ref('Qwen')
  const account = ref('qwen@example.com')
  
  // 关联账户列表
  const linkedAccounts = ref([
    { id: 1, name: '关联账户1', email: 'account1@example.com' },
    { id: 2, name: '关联账户2', email: 'account2@example.com' }
  ])
  
  // 修改密码相关状态
  const showChangePassword = ref(false)
  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  
  // 添加关联账户相关状态
  const showAddAccount = ref(false)
  const newEntry = ref('') // 新账户或新密码
  
  // 修改密码方法
  const changePassword = () => {
    if (newEntry.value !== confirmPassword.value) {
      alert(`新密码和确认密码不匹配`)
      return
    }
    alert('密码修改成功')
    closeModal()
  }
  
  // 添加关联账户方法
  const addAccount = () => {
    linkedAccounts.value.push({ id: Date.now(), name: newEntry.value, email: `${newEntry.value}@example.com` })
    alert('关联账户添加成功')
    closeModal()
  }
  
  // 处理表单提交
  const handleFormSubmit = () => {
    if (showAddAccount.value) {
      addAccount()
    } else {
      changePassword()
    }
  }
  
  // 关闭模态框
  const closeModal = () => {
    showChangePassword.value = false
    showAddAccount.value = false
    // 重置表单
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    newEntry.value = ''
  }
  
  // 删除关联账户方法
  const removeAccount = (accountId: number) => {
    linkedAccounts.value = linkedAccounts.value.filter(account => account.id !== accountId)
  }
  
  // 登出方法
  const logout = () => {
    router.replace({
        name: 'Login',//必须用name而不是path
        params: {
        }
    })
  }
  </script>
  
  <style scoped>
  /* 你可以在这里添加额外的样式 */
  </style>