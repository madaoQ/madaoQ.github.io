import { createRouter, createWebHistory } from 'vue-router';
import MessageList from '@/views/MessageList.vue';
// import MessageDetail from '@/views/MessageDetail.vue';
// import ReceivedNotification from '@/views/ReceivedNotification.vue'
import Chart from '@/views/Chart/index.vue'
import User from '@/views/User.vue'
// import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import LoginForm from '@/views/login/index.vue'
const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    name: 'MessageList',
    component: MessageList,
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
