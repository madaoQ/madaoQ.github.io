<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/navbar.vue';
import SvgIcon from '@/components/svgicon.vue'

const route = useRoute();

const shouldShowNavbar = computed(() => {
  const excludedPages = ['Login', 'Register'];
  return !excludedPages.includes(route.name as string);
});

// 监听键盘状态
const isKeyboardVisible = ref(false);
let lastWindowHeight = window.innerHeight;

function handleResize() {
  const currentWindowHeight = window.innerHeight;

  if (lastWindowHeight  > currentWindowHeight) {
    isKeyboardVisible.value = true;
  } else if (currentWindowHeight  > lastWindowHeight) {
    isKeyboardVisible.value = false;
  }

  lastWindowHeight = currentWindowHeight;
}


onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
     <div class="app-container h-[90vh] overflow-y-auto overflow-x-hidden">
      <RouterView />
    <Navbar v-if="shouldShowNavbar && !isKeyboardVisible" class="fixed-navbar" />
  </div>
</template>

<style scoped>
</style>
